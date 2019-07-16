import React, { useState } from 'react';

import SubjectsForm from './subjectsForm';
import SubjectsList from './subjectsList';

const SubjectsPage = () => {
  /* Subject editing state management */
  let defaultEditSubState = {
    edit_mode_on: false,
    editing_started: false,
    sub_id: "0"
  }
  let [editSubState, setEditSubState] = useState(defaultEditSubState);
  const handleEditSubClick = (id: string) => {
    setEditSubState({
      edit_mode_on: true,
      editing_started: false,
      sub_id: id
    });
  }
  const setEditingStarted = () => {
    setEditSubState({
      ...editSubState,
      edit_mode_on: true,
      editing_started: true
    });
  }
  const setEditingDone = () => {
    setEditSubState(defaultEditSubState);
  }

  return (
    <div>
      <h3>Manage Subjects</h3>
      <SubjectsForm
        editSubState={editSubState}
        setEditingStarted={setEditingStarted}
        setEditingDone={setEditingDone}
      /><br /><br />
      <SubjectsList
        editSubState={editSubState}
        handleEditSubClick={handleEditSubClick}
      />
    </div>
  );
};

export default SubjectsPage;