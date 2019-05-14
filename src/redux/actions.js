import {
  ADD_SUBJECT,
  REMOVE_SUBJECT,
  ADD_PERIOD,
  REMOVE_PERIOD } from "./actionTypes";

let nextSubjectId = 0;

export const addSubject = subjectData => ({
  type: ADD_SUBJECT,
  payload: {
    id: nextSubjectId++,
    subjectData
  }
});

export const removeSubject = subjectID => ({
  type: REMOVE_SUBJECT,
  payload: { subjectID }
});

export const addPeriod = (subjectID, periodInfo) => ({
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

export const removePeriod = (periodInfo) => ({
  type: REMOVE_PERIOD,
  payload: {
    periodInfo,
  }
});