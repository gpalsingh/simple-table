import React from 'react';
import { connect } from 'react-redux';

const SubjectsList = ({ subjects }) => {
  let listItems = [];

  for (let subject of subjects) {
    listItems.push(
      <li key={subject.id} id={subject.id}>
        { subject.name }
      </li>
    );
  }

  return (
    <ul>
      {listItems}
    </ul>
  );
};

const mapStateToProps = state => {
  const { subjects } = state;

  return { subjects }
}

export default connect(mapStateToProps)(SubjectsList);