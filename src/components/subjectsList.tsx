import React from 'react';
import { connect } from 'react-redux';
import {
  StateSubjectDataInterface,
  StoreStateInterface
} from "../types/store";

const SubjectsList = ({ subjects }: { subjects: StateSubjectDataInterface[] }) => {
  let listItems = [];
  let subjects_table;

  for (let subject of subjects) {
    listItems.push(
      <tr key={subject.id} id={subject.id.toString()}>
        <td>{ subject.name }</td>
        <td>{ subject.short_name }</td>
        <td>{ subject.teacher_name }</td>
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

export default connect(mapStateToProps)(SubjectsList);