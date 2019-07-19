import React, { useState } from 'react';

import SubjectsForm from './subjectsForm';
import SubjectsList from './subjectsList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearSubjects } from '../redux/actions';
import { ClearSubjectsType } from '../types/reducers';
import { toast } from 'react-toastify';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

type SubjectsPageType = {
  clearSubjects: ClearSubjectsType,
}

const ClearSubjectsButton = ({clearSubjects}: {clearSubjects: ClearSubjectsType}) => {
  const [isPromptOpen, setPromptOpen] = useState(false);
  const togglePrompt = () => { setPromptOpen(!isPromptOpen); };
  const confirmClearSubjects = (event: React.MouseEvent<HTMLElement>) => {
    clearSubjects();
    togglePrompt();
    toast.success("Removed all subjects");
  }

  return (
    <div className="mt-2 mt-sm-0">
      <Button onClick={togglePrompt} color="danger">
        Remove all subjects
      </Button>
      <Modal
        isOpen={isPromptOpen}
        toggle={togglePrompt}
      >
        <ModalHeader toggle={togglePrompt}>
          Confirm action
        </ModalHeader>
        <ModalBody>
          Proceed with removing all subjects? This action <b>CANNOT</b> be reversed.
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="danger" onClick={confirmClearSubjects}>
            Yes, remove
          </Button>
          <Button onClick={togglePrompt} color="secondary">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const SubjectsPage = ({ clearSubjects }: SubjectsPageType) => {
  /* Subject editing state management */
  let defaultEditSubState = {
    edit_mode_on: false,
    editing_started: false,
    sub_id: "0"
  }
  let [editSubState, setEditSubState] = useState(defaultEditSubState);
  const handleEditSubClick = (id: string) => {
    setEditSubState({
      edit_mode_on: true,
      editing_started: false,
      sub_id: id
    });
  }
  const setEditingStarted = () => {
    setEditSubState({
      ...editSubState,
      edit_mode_on: true,
      editing_started: true
    });
  }
  const setEditingDone = () => {
    setEditSubState(defaultEditSubState);
  }

  return (
    <div>
      <h3>Manage Subjects</h3>
      <SubjectsForm
        editSubState={editSubState}
        setEditingStarted={setEditingStarted}
        setEditingDone={setEditingDone}
      /><br />
      <div className="d-sm-flex">
        <Button tag={Link} to="/" className="mr-auto">Back to Time Table</Button>
        <ClearSubjectsButton clearSubjects={clearSubjects}/>
      </div>
      <hr />
      <SubjectsList
        editSubState={editSubState}
        handleEditSubClick={handleEditSubClick}
      />
    </div>
  );
};

export default connect(null, { clearSubjects })(SubjectsPage);