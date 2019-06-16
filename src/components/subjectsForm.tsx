import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { addSubject, updateSubject } from '../redux/actions';
import {
  AddSubjectType,
  UpdateSubjectType
} from '../types/reducers';
import { EditSubStateType } from '../types/subjects';
import { getSubjectById } from '../utils/redux';
import {
  StoreStateInterface,
  StateSubjectDataInterface
} from '../types/store';

interface SubjectsFormProps {
  subjects: StateSubjectDataInterface[],
  addSubject: AddSubjectType,
  updateSubject: UpdateSubjectType,
  editSubState: EditSubStateType,
  setEditingStarted: () => void,
  setEditingDone: () => void
}

const createSubShortName = (sub_name: string): string => {
  const sub_name_no_space = sub_name.replace(/ /g, '');
  if (sub_name_no_space.length < 1) return '';
  const name_len = Math.min(3, sub_name_no_space.length);
  return sub_name_no_space.substr(0, name_len).toUpperCase();
}

const SubjectsForm = ({ subjects, addSubject, updateSubject, editSubState, setEditingStarted, setEditingDone }: SubjectsFormProps) => {
  const initial_state = {
    sub_name_value: '',
    sub_name_short_value: '',
    teacher_name_value: '',
    user_changed_short_name: false
  };
  let [formState, setFormState] = useState(initial_state);

  useLayoutEffect(
    () => {
      /* Set values from existing subject if in edit mode */
      if (editSubState.edit_mode_on && (!editSubState.editing_started)) {
        /* Fill in fields from stored data */
        const oldSubData = getSubjectById(subjects, editSubState.sub_id);
        if (!oldSubData) {
          setEditingDone();
        } else {
          /* set editSubState.editing_started to true */
          setEditingStarted();
          /* Change form state to editing */
          setFormState({
            ...formState,
            sub_name_value: oldSubData.name,
            sub_name_short_value: oldSubData.short_name,
            teacher_name_value: oldSubData.teacher_name,
            user_changed_short_name: true
          });
        }
      }
    },
    [editSubState, subjects, setEditingDone, setEditingStarted, formState]
  );

  const resetForm = () => {
    if (editSubState.edit_mode_on) {
      setEditingDone();
    }
    setFormState(initial_state);
  }

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sub_name = formState.sub_name_value.trim();
    let teacher_name = '';
    let sub_short_name = '';

    /* Form validation */
    if (!sub_name) {
      alert("The name should have a value");
      return;
    }
    if (formState.teacher_name_value) {
      teacher_name = formState.teacher_name_value.trim();
    }
    if (!formState.sub_name_short_value) {
      sub_short_name = createSubShortName(sub_name);
    } else if (formState.sub_name_short_value.length < 1) {
      alert("Subject short name is required");
      return;
    } else {
      sub_short_name = formState.sub_name_short_value;
    }

    if (editSubState.edit_mode_on) {
      updateSubject(editSubState.sub_id, {
        subject_name: sub_name,
        short_name: sub_short_name,
        teacher_name: teacher_name
      });
    } else {
      addSubject({
        subject_name: sub_name,
        short_name: sub_short_name,
        teacher_name: teacher_name
      });
    }

    resetForm();
  };

  const handleShortNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    setFormState({
      ...formState,
      user_changed_short_name: true,
      sub_name_short_value: (event.target as HTMLInputElement).value
    });
  }

  const handleSubNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    let new_short_name = formState.sub_name_short_value;
    const new_sub_name = (event.target as HTMLInputElement).value
    let new_short_name_changed = formState.user_changed_short_name;
    /* Reset auto short name generation if user clears subject name */
    if (!new_sub_name.trim()) {
      new_short_name_changed = false;
    }
    /* Don't update short name if user customized short name */
    if (!new_short_name_changed) {
      new_short_name = createSubShortName(new_sub_name);
    }
    setFormState({
      ...formState,
      sub_name_short_value: new_short_name,
      sub_name_value: new_sub_name,
      user_changed_short_name: new_short_name_changed
    });
  }

  const handleTeacherNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    setFormState({
      ...formState,
      teacher_name_value: (event.target as HTMLInputElement).value
    });
  }

  /* Show different buttons depending on if we are editing */
  let submit_button_text = "Submit";
  let cancel_button = (
    <button onClick={resetForm}>
      Cancel
    </button>
  );
  if (editSubState.edit_mode_on) {
    submit_button_text = "Update"
  }

  return(
    <form onSubmit={formSubmit}>
      Subject Name:
      <input
        value={formState.sub_name_value}
        type="text"
        onChange={handleSubNameInput}
      /><br />
      Subject Short Name:
      <input
        value={formState.sub_name_short_value}
        type="text"
        onChange={handleShortNameInput}
      /><br />
      Teacher Name:
      <input
        value={formState.teacher_name_value}
        type="text"
        onChange={handleTeacherNameInput}
      /><br />
      <button type="submit">{submit_button_text}</button>
      {editSubState.edit_mode_on && cancel_button}
    </form>
  );
};

const mapStateToProps = (state: StoreStateInterface) => {
  const { subjects } = state;

  return { subjects }
}

export default connect(mapStateToProps, { addSubject, updateSubject })(SubjectsForm);