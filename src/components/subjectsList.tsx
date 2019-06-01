import React from 'react';
import { connect } from 'react-redux';
import { removeSubject } from '../redux/actions';
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
  removeSubject: RemoveSubjectType
}

const SubjectRemoveButton = ({ sub_id, removeSubject }: SubjectRemoveButtonInterface) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeSubject(sub_id);
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

  for (let subject of subjects) {
    listItems.push(
      <tr key={subject.id} id={subject.id.toString()}>
        <td>{ subject.name }</td>
        <td>{ subject.short_name }</td>
        <td>{ subject.teacher_name }</td>
        <td>
          <SubjectRemoveButton
            sub_id={subject.id}
            removeSubject={removeSubject}
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
      {subjects_table}
    </div>
  );
};

const mapStateToProps = (state: StoreStateInterface) => {
  const { subjects } = state;

  return { subjects }
}

export default connect(mapStateToProps, { removeSubject })(SubjectsList);