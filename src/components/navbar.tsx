import React, { useState, useLayoutEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  StoreStateInterface,
  StateSwType
} from '../types/store';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ARROW_DOWN_GREEN from '../images/arrow_down_green.svg';

type AppNavBarPropType = {
  sw: StateSwType
}

/* Service worker status type */
type swStateType = {
  status: "none" | "waiting",
  registration: null | ServiceWorkerRegistration
}

/* Service worker notifications UI type */
type swUiType = {
  updateButtonDisabled: boolean,
  autoToastShown: boolean
}

/* Shows a simple text notification that stays there until clicked on */
const showSwUpdateToast = (registration: ServiceWorkerRegistration | null, onClose: any, onOpen: any) => {
  if (!registration) return;
  const updateDialog = "An update is availabe. It will be automatically applied when all tabs for this app are closed.";
  toast.info(updateDialog, {
    position: "top-center",
    autoClose: false,
    closeOnClick: true,
    draggable: false,
    onClose: onClose,
    onOpen: onOpen
  });
};

const AppNavBar = ({ sw }: AppNavBarPropType) => {
  let [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  }
  const closeNavMenu = () => {
    setIsNavOpen(false);
  }

  /* Service worker component local state */
  const defaultSwState: swStateType = {
    status: "none",
    registration: null
  };
  let [swState, setSwState] = useState(defaultSwState);

  /* Service worker notifications UI */
  const defaultSwUiState: swUiType = {
    updateButtonDisabled: false,
    autoToastShown: false
  }
  let [swUiState, setSwUiState] = useState(defaultSwUiState);
  const disableUpdateButton = () => {
    setSwUiState({
      ...swUiState,
      updateButtonDisabled: true
    })
  };
  const enableUpdateButton = () => {
    setSwUiState({
      ...swUiState,
      updateButtonDisabled: false
    })
  };

  /* effect for checking service worker waiting status */
  useLayoutEffect(
    () => {
      const resetSwState = () => {
        setSwState(defaultSwState);
        setSwUiState(defaultSwUiState);
      };

      async function checkSw() {
        /* Check service worker support in browser */
        if (!navigator.serviceWorker) return;
        /* Get registration again manually since we don't persist it in redux */
        const registration = await navigator.serviceWorker.getRegistration();
        /* Don't proceed until we find a registration with and active worker */
        if (!registration || !registration.active) {
          resetSwState();
          return;
        }

        /* Look for a waiting service worker */
        if (registration.waiting) {
          /* Avoid duplicate state updates */
          if ((swState.status === "waiting") && (swState.registration === registration)) {
            return;
          }
          /* Update component state with the new info */
          setSwState({
            status: "waiting",
            registration: registration,
          });

        }
      }

      checkSw();
    }, [sw, swState, defaultSwState, defaultSwUiState] /* Listen to changes from service worker through redux */
  );

  /* effect for showing auto update notification if service worker is waiting */
  useLayoutEffect(
    () => {
      if ((swState.status !== "waiting") || (swUiState.autoToastShown)) return;
      /* Similar to enableUpdateButton but avoid setting stale values */
      const onClose = () => {
        setSwUiState({
          autoToastShown: true,
          updateButtonDisabled: false
        });
      };
      /* Similar to disableUpdateButton but also mark toast shown */
      const onOpen = () => {
        setSwUiState({
          autoToastShown: true,
          updateButtonDisabled: true
        });
      }
      showSwUpdateToast(swState.registration, onClose, onOpen);
    }, [swState, swUiState]
  );

  return (
    <Navbar color="light" light expand="md" sticky="top">
      <NavbarBrand tag={Link} to="/" onClick={closeNavMenu} className="mr-auto">SimpleTable</NavbarBrand>
      {swState.status === "waiting" ?
        <Button outline color="info" className="mr-2 pt-1 pb-1"
          onClick={() => {showSwUpdateToast(swState.registration, enableUpdateButton, disableUpdateButton)}}
          disabled={swUiState.updateButtonDisabled}
        >
          <img src={ARROW_DOWN_GREEN} alt="Update button" style={{height: "30px", width: "30px"}}/>
        </Button> : null
      }

      <NavbarToggler onClick={toggleNavMenu} />
      <Collapse isOpen={isNavOpen} navbar className="flex-sm-grow-0">
        <Nav navbar>
          <NavItem>
            <NavLink to="/" tag={Link} onClick={closeNavMenu}>Manage Table</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/manageSubjects/" tag={Link} onClick={closeNavMenu}>Mange Subjects</NavLink>
          </NavItem>
          <NavItem>
            <NavLink target="_blank" href="https://github.com/gpalsingh/simple-table">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state: StoreStateInterface) => {
  const { sw } = state;
  return { sw };
}

export default connect(mapStateToProps)(AppNavBar);