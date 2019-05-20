import React from 'react';
import { connect } from 'react-redux';
import { addSubject } from '../redux/actions';

const createSubShortName = (sub_name) => {
  const sub_name_no_space = sub_name.replace(/ /g, '');
  if (sub_name_no_space.length < 1) return null;
  const name_len = Math.min(3, sub_name_no_space.length);
  return sub_name_no_space.substr(0, name_len).toUpperCase();
}

const SubjectsForm = ({ addSubject }) => {
  let sub_name_raw, teacher_name_raw, sub_name_short_raw;
  let user_changed_short_name = false;

  const resetForm = () => {
    sub_name_raw.value = '';
    teacher_name_raw.value = '';
    sub_name_short_raw.value = '';
    user_changed_short_name = false;
  }
  const formSubmit = e => {
    e.preventDefault();
    let sub_name = sub_name_raw.value.trim();
    let teacher_name = null;
    let sub_short_name = null;

    /* Form validation */
    if (!sub_name) {
      alert("The name should have a value");
      return;
    }
    if (teacher_name_raw) {
      teacher_name = teacher_name_raw.value.trim();
    }
    if (!sub_name_short_raw) {
      sub_short_name = createSubShortName(sub_name);
    } else if (sub_name_short_raw.value.length < 1) {
      alert("Subject short name is required");
      return;
    } else {
      sub_short_name = sub_name_short_raw.value;
    }

    addSubject({
      subject_name: sub_name,
      short_name: sub_short_name,
      teacher_name: teacher_name
    });

    resetForm();
  };

  const handleShortNameInput = (event) => {
    event.preventDefault();

    user_changed_short_name = true;
  }

  const handleSubNameInput = (event) => {
    event.preventDefault();

    /* Do nothing if user customized short name */
    if (user_changed_short_name) return;

    sub_name_short_raw.value = createSubShortName(sub_name_raw.value)
  }

  return(
    <form onSubmit={formSubmit}>
      Subject Name:
      <input
        ref={node => sub_name_raw = node}
        type="text"
        onInput={handleSubNameInput}
      /><br />
      Subject Short Name:
      <input
        ref={node => sub_name_short_raw = node}
        type="text"
        onInput={handleShortNameInput}
      /><br />
      Teacher Name:
      <input ref={node => teacher_name_raw = node} type="text" /><br />
      <button type="add">Submit</button>
    </form>
  );
};

export default connect(null, { addSubject })(SubjectsForm);