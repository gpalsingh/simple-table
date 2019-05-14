import {
  ADD_SUBJECT,
  REMOVE_SUBJECT
} from '../actionTypes';

const subjects = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_SUBJECT:
      const {id, subjectData} = payload;
      return [
        ...state,
        {
          id: id,
          name: subjectData.subject_name,
          teacher_name: subjectData.teacher_name
        }
      ];

    case REMOVE_SUBJECT:
      return state.filter(sub => sub.id !== action.id);

    default:
      return state;
  }
};

export default subjects;