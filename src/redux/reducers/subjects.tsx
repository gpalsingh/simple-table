import {
  ADD_SUBJECT,
  REMOVE_SUBJECT
} from '../actionTypes';
import {
  SubjectActionInterface} from '../../types/reducers';
import { StateSubjectDataInterface } from "../../types/store";

const subjects = (state: StateSubjectDataInterface[] = [], action: SubjectActionInterface) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_SUBJECT:
      const {id, subjectData} = payload;
      if (!subjectData) return state;
      return [
        ...state,
        {
          id: id,
          name: subjectData.subject_name,
          short_name: subjectData.short_name,
          teacher_name: subjectData.teacher_name
        }
      ];

    case REMOVE_SUBJECT:
      return state.filter((sub: StateSubjectDataInterface) => sub.id !== action.payload.id);

    default:
      return state;
  }
};

export default subjects;