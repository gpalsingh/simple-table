import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeSubject, setEditingSubject } from '../redux/actions';
import {
  StateSubjectDataInterface,
  StoreStateInterface
} from "../types/store";
import {
  RemoveSubjectType
} from '../types/reducers';
import { EditingSubStateType } from '../types/store';
import {
  Table,
  Button,
  Jumbotron,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { toast } from 'react-toastify';
import { EditingSubActionType } from '../types/actions';
import { sortSubjectsByName } from '../utils/redux';

interface SubjectsListInterface {
  subjects: StateSubjectDataInterface[],
  removeSubject: RemoveSubjectType,
  setEditingSubject: (sub_id: string) => EditingSubActionType,
  editingSubject: EditingSubStateType
}
interface SubjectRemoveButtonInterface {
  sub_id: string,
  removeSubButtonClick: any,
  editingSubject: EditingSubStateType
}
interface removeSubPromptStateInterface {
  isOpen: boolean,
  sub_id: string
}
interface RemoveSubjectPopupInterface {
  removeSubPromptState: removeSubPromptStateInterface,
  toggleRemoveSubPrompt: () => void,
  confirmRemoveSub: (event: React.MouseEvent<HTMLElement>) => void
}

const SubjectRemoveButton = ({ sub_id, removeSubButtonClick, editingSubject }: SubjectRemoveButtonInterface) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeSubButtonClick(sub_id);
  }
  return (
    <Button
      color="danger"
      onClick={handleClick}
      disabled={editingSubject.mode_on}
      className="mr-2 mb-2 mb-md-0"
    >
      Remove
    </Button>
  );
}

const RemoveSubjectPopup = ({ removeSubPromptState, toggleRemoveSubPrompt, confirmRemoveSub}: RemoveSubjectPopupInterface) => {
  return (
    <Modal
      isOpen={removeSubPromptState.isOpen}
      toggle={toggleRemoveSubPrompt}
    >
      <ModalHeader toggle={toggleRemoveSubPrompt}>
        Confirm remove subject
      </ModalHeader>
      <ModalBody>
        This action is irreversible. Are you sure?
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="danger" onClick={confirmRemoveSub}>
          Yes, remove
        </Button>
        <Button onClick={toggleRemoveSubPrompt} color="secondary">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const SubjectsList = ({ subjects, removeSubject, setEditingSubject, editingSubject }: SubjectsListInterface) => {
  let listItems = [];
  let subjectsExist = false;
  let subjects_table;
  /* Prompt state management */
  let [removeSubPromptState, setRemoveSubPromptState] = useState({
    isOpen: false,
    sub_id: "0"
  });

  const handleRemoveSubButtonClick = (sub_id: string) => {
    setRemoveSubPromptState({
      isOpen: true,
      sub_id: sub_id
    });
  };

  const toggleRemoveSubPrompt = () => {
    setRemoveSubPromptState({
      ...removeSubPromptState,
      isOpen: !removeSubPromptState.isOpen,
    });
  };

  const confirmRemoveSub = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    removeSubject(removeSubPromptState.sub_id);
    toggleRemoveSubPrompt();
    toast.error("Removed a subject");
  }

  /* Create subjects list */
  for (let subject of subjects) {
    listItems.push(
      <tr key={subject.id} id={subject.id.toString()}>
        <td>{ subject.name }</td>
        <td>{ subject.short_name }</td>
        <td>{ subject.teacher_name }</td>
        <td>
          <SubjectRemoveButton
            sub_id={subject.id}
            removeSubButtonClick={handleRemoveSubButtonClick}
            editingSubject={editingSubject}
          />
          <Button
            color="primary"
            onClick={() => setEditingSubject(subject.id)}
            disabled={editingSubject.mode_on}
          >
            Edit
          </Button>
        </td>
      </tr>
    );
  }

  /* Show table headers only if subjects exist */
  if (listItems.length > 0) {
    subjectsExist = true;
    subjects_table = (
      <Table striped responsive>
        <thead>
          <tr>
            <th>Subject name</th>
            <th>Short name</th>
            <th>Teacher's name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listItems}
        </tbody>
      </Table>
    );
  }

  if (!subjectsExist) {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <h3 className="display-3">Your subjects will appear here</h3>
          <p className="lead">To get started add a subject using the form above.</p>
        </Container>
      </Jumbotron>
    );
  }
  return (
    <div>
      <RemoveSubjectPopup
        removeSubPromptState={removeSubPromptState}
        toggleRemoveSubPrompt={toggleRemoveSubPrompt}
        confirmRemoveSub={confirmRemoveSub}
      />
      <h4>Subjects List</h4>
      {subjects_table}
    </div>
  );
};

const mapStateToProps = (state: StoreStateInterface) => {
  const { subjects: subjects_orig, editingSubject } = state;
  /* Sort subjects by name before displaying them */
  const subjects = sortSubjectsByName(subjects_orig);

  return { subjects, editingSubject }
}

export default connect(mapStateToProps, { removeSubject, setEditingSubject })(SubjectsList);