import React, { useState } from 'react';

import SubjectsForm from './subjectsForm';
import SubjectsList from './subjectsList';

const SubjectsPage = () => {
  /* Subject editing state management */
  let defaultEditSubState = {
    edit_mode_on: false,
    editing_started: false,
    sub_id: 0
  }
  let [editSubState, setEditSubState] = useState(defaultEditSubState);
  const handleEditSubClick = (id: number) => {
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
      <SubjectsForm
        editSubState={editSubState}
        setEditingStarted={setEditingStarted}
        setEditingDone={setEditingDone}
      />
      <SubjectsList
        editSubState={editSubState}
        handleEditSubClick={handleEditSubClick}
      />
    </div>
  );
};

export default SubjectsPage;