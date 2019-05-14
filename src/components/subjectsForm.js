import React from 'react';
import { connect } from 'react-redux';
import { addSubject } from '../redux/actions';

const SubjectsForm = ({ addSubject }) => {
  let sub_name, teacher_name;
  const formSubmit = e => {
    e.preventDefault();

    if (!sub_name.value.trim() || !teacher_name.value.trim()) return;

    addSubject({
      subject_name: sub_name.value.trim(),
      teacher_name: teacher_name.value.trim()
    });
    sub_name.value = '';
    teacher_name.value = '';
  };

  return(
    <form onSubmit={formSubmit}>
      Subject Name:
      <input ref={node => sub_name = node} type="text"></input><br />
      Teacher Name:
      <input ref={node => teacher_name = node} type="text"></input><br />
      <button type="add">Submit</button>
    </form>
  );
};

export default connect(null, { addSubject })(SubjectsForm);