import {
  ADD_SUBJECT,
  REMOVE_SUBJECT,
  ADD_PERIOD,
  REMOVE_PERIOD,
  UPDATE_SUBJECT} from "./actionTypes";

import {
  SubjectDataInterface,
  PeriodInfoInterface
} from '../types/actions';
import {
  PeriodsActionsInterface,
  SubjectActionInterface
} from '../types/reducers';

let nextSubjectId = 0;

export const addSubject = (subjectData: SubjectDataInterface): SubjectActionInterface => ({
  type: ADD_SUBJECT,
  payload: {
    id: nextSubjectId++,
    subjectData
  }
});

export const removeSubject = (subjectID: number): SubjectActionInterface => ({
  type: REMOVE_SUBJECT,
  payload: {
    id: subjectID
  }
});

export const updateSubject = (sub_id: number, subjectData: SubjectDataInterface): SubjectActionInterface => ({
  type: UPDATE_SUBJECT,
  payload: {
    id: sub_id,
    subjectData
  }
});

export const addPeriod = (subjectID: number, periodInfo: PeriodInfoInterface): PeriodsActionsInterface => ({
  /*
  {
    type: 'ADD_PERIOD',
    payload: {
      id: 2,
      periodInfo: {
        day: 3,
        periodNo: 2
      }
    }
  }
  */
  type: ADD_PERIOD,
  payload: {
    id: subjectID,
    periodInfo
  }
});

export const removePeriod = (periodInfo: PeriodInfoInterface): PeriodsActionsInterface => ({
  type: REMOVE_PERIOD,
  payload: {
    periodInfo,
  }
});