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

interface SubjectsListInterface {
  subjects: StateSubjectDataInterface[],
  removeSubject: RemoveSubjectType
}
interface SubjectRemoveButtonInterface {
  sub_id: number,
  removeSubButtonClick: any
}

const SubjectRemoveButton = ({ sub_id, removeSubButtonClick }: SubjectRemoveButtonInterface) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeSubButtonClick(sub_id);
  }
  return (
    <button onClick={handleClick}>
      Remove
    </button>
  );
}

const SubjectsList = ({ subjects, removeSubject }: SubjectsListInterface) => {
  let listItems = [];
  let subjects_table;
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
          />
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
      {subjects_table}
    </div>
  );
};

const mapStateToProps = (state: StoreStateInterface) => {
  const { subjects } = state;

  return { subjects }
}

export default connect(mapStateToProps, { removeSubject })(SubjectsList);