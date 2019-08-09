import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { addSubject, updateSubject, setEditingSubjectDone } from '../redux/actions';
import { toast } from 'react-toastify';
import {
  AddSubjectType,
  UpdateSubjectType
} from '../types/reducers';
import { getSubjectById } from '../utils/redux';
import {
  StoreStateInterface,
  StateSubjectDataInterface,
  EditingSubStateType
} from '../types/store';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback
} from 'reactstrap';
import { EditingSubActionType } from '../types/actions';

interface SubjectsFormProps {
  subjects: StateSubjectDataInterface[],
  addSubject: AddSubjectType,
  updateSubject: UpdateSubjectType,
  editingSubject: EditingSubStateType,
  setEditingSubjectDone: () => EditingSubActionType
}

const createSubShortName = (sub_name: string): string => {
  const sub_name_no_space = sub_name.replace(/ /g, '');
  if (sub_name_no_space.length < 1) return '';
  const name_len = Math.min(3, sub_name_no_space.length);
  return sub_name_no_space.substr(0, name_len).toUpperCase();
}

const SubjectsForm = ({ subjects, addSubject, updateSubject, editingSubject, setEditingSubjectDone }: SubjectsFormProps) => {
  const initial_state = {
    sub_name_value: '',
    sub_name_short_value: '',
    teacher_name_value: '',
    invalid_field_id: '',
    user_changed_short_name: false,
    mode: "add" //Form editing mode
  };
  const SUBJECT_NAME_ID = "subjectName";
  const SUBJECT_SHORT_NAME_ID = "subjectShortName";
  const TEACHER_NAME_ID = "teacherName";
  let sub_name_input_el: HTMLInputElement | null = null;
  let [formState, setFormState] = useState(initial_state);

  useLayoutEffect(
    () => {
      /* Set values from existing subject if in edit mode */
      if (!editingSubject.mode_on || (formState.mode === "edit")) return;
      /* Fill in fields from stored data */
      const oldSubData = getSubjectById(subjects, editingSubject.sub_id);
      if (!oldSubData) {
        setEditingSubjectDone();
        return;
      }
      /* set editSubState.editing_started to true */
      //setEditingStarted();
      /* Change form state to editing */
      setFormState({
        sub_name_value: oldSubData.name,
        sub_name_short_value: oldSubData.short_name,
        teacher_name_value: oldSubData.teacher_name,
        user_changed_short_name: true,
        mode: "edit",
        invalid_field_id: ''
      });
      if (sub_name_input_el !== null) {
        sub_name_input_el.focus();
      }
    }, [editingSubject, formState.mode]//, formState, setEditingSubjectDone, subjects]
  );

  const resetForm = () => {
    if (editingSubject.mode_on) {
      setEditingSubjectDone();
    }
    setFormState(initial_state);
  }

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sub_name = formState.sub_name_value.trim();
    let teacher_name = '';
    let sub_short_name = '';

    /* Form validation
       Only report the first error enountered */
    if (!sub_name) {
      setFormState({
        ...formState,
        invalid_field_id: SUBJECT_NAME_ID
      });
      return;
    }
    if (formState.teacher_name_value) {
      teacher_name = formState.teacher_name_value.trim();
    }
    if (!(formState.sub_name_short_value || formState.user_changed_short_name)) {
      sub_short_name = createSubShortName(sub_name);
    } else if (formState.sub_name_short_value.length < 2) {
      setFormState({
        ...formState,
        invalid_field_id: SUBJECT_SHORT_NAME_ID
      });
      return;
    } else {
      sub_short_name = formState.sub_name_short_value;
    }

    if (editingSubject.mode_on) {
      updateSubject(editingSubject.sub_id, {
        subject_name: sub_name,
        short_name: sub_short_name,
        teacher_name: teacher_name
      });
      /* Show toast showing update success */
      toast.success("Updated subject " + sub_name);
    } else {
      addSubject({
        subject_name: sub_name,
        short_name: sub_short_name,
        teacher_name: teacher_name
      });
      /* Show toast showing addition success */
      toast.info("Added subject " + sub_name);
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
  let submit_button_text = "Add";
  let cancel_button = (
    <Button onClick={resetForm} color="danger">
      Cancel
    </Button>
  );
  if (editingSubject.mode_on) {
    submit_button_text = "Update"
  }

  return(
    <Form onSubmit={formSubmit}>
      <FormGroup>
        <Label for={SUBJECT_NAME_ID}>Subject Name</Label>
        <Input
          value={formState.sub_name_value}
          type="text"
          onChange={handleSubNameInput}
          id={SUBJECT_NAME_ID}
          placeholder="example: Science"
          invalid={formState.invalid_field_id === SUBJECT_NAME_ID}
          innerRef={(node: HTMLInputElement) => {sub_name_input_el = node}}
        />
        {(formState.invalid_field_id === SUBJECT_NAME_ID) ?
          (<FormFeedback>
            Subject name is required
          </FormFeedback>) : (null)}
      </FormGroup>
      <FormGroup>
        <Label for={SUBJECT_SHORT_NAME_ID}>Subject Short Name</Label>
        <Input
          id={SUBJECT_SHORT_NAME_ID}
          value={formState.sub_name_short_value}
          type="text"
          onChange={handleShortNameInput}
          placeholder="example: SCI"
          invalid={formState.invalid_field_id === SUBJECT_SHORT_NAME_ID}
        />
        {(formState.invalid_field_id === SUBJECT_SHORT_NAME_ID) ?
          (<FormFeedback>
            Subject short name must be at least two characters
          </FormFeedback>) : (null)}
      </FormGroup>
      <FormGroup>
        <Label for={TEACHER_NAME_ID}>Teacher's Name</Label>
        <Input
          id={TEACHER_NAME_ID}
          value={formState.teacher_name_value}
          type="text"
          onChange={handleTeacherNameInput}
          placeholder="example: Ms. Smith"
          invalid={formState.invalid_field_id === TEACHER_NAME_ID}
        />
        {(formState.invalid_field_id === TEACHER_NAME_ID) ?
          (<FormFeedback>
            Error with teacher name
          </FormFeedback>) : (null)}
      </FormGroup>
      <Button color="primary" type="submit" className="mr-2">{submit_button_text}</Button>
      {editingSubject.mode_on && cancel_button}
    </Form>
  );
};

const mapStateToProps = (state: StoreStateInterface) => {
  const { subjects, editingSubject } = state;

  return { subjects, editingSubject }
}

export default connect(mapStateToProps, { addSubject, updateSubject, setEditingSubjectDone })(SubjectsForm);