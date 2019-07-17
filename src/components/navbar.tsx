import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';

export const AppNavBar = () => {
  let [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  }
  const closeNavMenu = () => {
    setIsNavOpen(false);
  }

  return (
    <Navbar color="light" light expand="md" sticky="top">
      <NavbarBrand tag={Link} to="/" onClick={closeNavMenu}>SimpleTable</NavbarBrand>
      <NavbarToggler onClick={toggleNavMenu} />
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className="ml-auto" navbar>
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