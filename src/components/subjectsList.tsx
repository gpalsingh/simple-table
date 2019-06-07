import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeSubject } from '../redux/actions';
import Popup from "reactjs-popup";
import {
  StateSubjectDataInterface,
  StoreStateInterface
} from "../types/store";
import {
  RemoveSubjectType
} from '../types/reducers';
import { EditSubStateType } from '../types/subjects';

interface SubjectsListInterface {
  subjects: StateSubjectDataInterface[],
  removeSubject: RemoveSubjectType,
  handleEditSubClick: (id: number) => void,
  editSubState: EditSubStateType
}
interface SubjectRemoveButtonInterface {
  sub_id: number,
  removeSubButtonClick: any,
  editSubState: EditSubStateType
}
interface removeSubPromptStateInterface {
  isOpen: boolean,
  sub_id: number
}
interface RemoveSubjectPopupInterface {
  removeSubPromptState: removeSubPromptStateInterface,
  closeRemoveSubPrompt: () => void,
  confirmRemoveSub: (event: React.FormEvent<HTMLFormElement>) => void
}

const SubjectRemoveButton = ({ sub_id, removeSubButtonClick, editSubState }: SubjectRemoveButtonInterface) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeSubButtonClick(sub_id);
  }
  return (
    <button
      onClick={handleClick}
      disabled={editSubState.edit_mode_on}
    >
      Remove
    </button>
  );
}

const RemoveSubjectPopup = ({ removeSubPromptState, closeRemoveSubPrompt, confirmRemoveSub}: RemoveSubjectPopupInterface) => {
  return (
    <Popup
        open={removeSubPromptState.isOpen}
        onClose={closeRemoveSubPrompt}
        modal
      >
        {close => (
          <form onSubmit={confirmRemoveSub}>
            <div>
              This action is irreversible. Are you sure?
            </div>
            <div>
              <input type="submit" value="Yes, remove" />
              <button onClick={close}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Popup>
  );
}

const SubjectsList = ({ subjects, removeSubject, handleEditSubClick, editSubState }: SubjectsListInterface) => {
  let listItems = [];
  let subjects_table;
  /* Prompt state management */
  let [removeSubPromptState, setRemoveSubPromptState] = useState({
    isOpen: false,
    sub_id: 0
  });

  const handleRemoveSubButtonClick = (sub_id: number) => {
    setRemoveSubPromptState({
      isOpen: true,
      sub_id: sub_id
    });
  };

  const closeRemoveSubPrompt = () => {
    setRemoveSubPromptState({
      isOpen: false,
      sub_id: 0
    });
  };

  const confirmRemoveSub = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    removeSubject(removeSubPromptState.sub_id);
    closeRemoveSubPrompt();
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
            editSubState={editSubState}
          />
        </td>
        <td>
          <button
            onClick={() => handleEditSubClick(subject.id)}
            disabled={editSubState.edit_mode_on}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  }

  /* Show table headers only if subjects exist */
  if (listItems.length > 0) {
    subjects_table = (
      <table>
        <tbody>
          <tr>
            <th>Subject name</th>
            <th>Short name</th>
            <th>Teacher's name</th>
          </tr>
          {listItems}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <RemoveSubjectPopup
        removeSubPromptState={removeSubPromptState}
        closeRemoveSubPrompt={closeRemoveSubPrompt}
        confirmRemoveSub={confirmRemoveSub}
      />
      {subjects_table}
    </div>
  );
};

const mapStateToProps = (state: StoreStateInterface) => {
  const { subjects } = state;

  return { subjects }
}

export default connect(mapStateToProps, { removeSubject })(SubjectsList);