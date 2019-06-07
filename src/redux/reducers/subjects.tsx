import {
  ADD_SUBJECT,
  REMOVE_SUBJECT,
  UPDATE_SUBJECT
} from '../actionTypes';
import {
  SubjectActionInterface} from '../../types/reducers';
import { StateSubjectDataInterface } from "../../types/store";


const updateStateSubject = (state: StateSubjectDataInterface[] = [], action: SubjectActionInterface) => {
  const { payload } = action;
  switch (action.type) {
    case UPDATE_SUBJECT:
      const {id, subjectData} = payload;
      /* Typescript error fix */
      if (!subjectData) return state;
      /* Create new state while keeping other subject data intact */
      const newState = state.map((oldSubjectData: StateSubjectDataInterface) => {
        if (oldSubjectData.id !== id) {
          return oldSubjectData;
        }
        /* Replace with new data */
        return {
          id: id,
          name: subjectData.subject_name,
          short_name: subjectData.short_name,
          teacher_name: subjectData.teacher_name
        };
      });

      return newState;
    default:
      return state
  }
}

const subjects = (state: StateSubjectDataInterface[] = [], action: SubjectActionInterface) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_SUBJECT:
      const {id, subjectData} = payload;
      /* Typescript error fix */
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

    case UPDATE_SUBJECT:
      return updateStateSubject(state, action);

    default:
      return state;
  }
};

export default subjects;