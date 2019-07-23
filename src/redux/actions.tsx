import {
  ADD_SUBJECT,
  REMOVE_SUBJECT,
  ADD_PERIOD,
  REMOVE_PERIOD,
  UPDATE_SUBJECT,
  CLEAR_SUBJECTS,
  CLEAR_PERIODS,
  MARK_SW_NOT_WAITING,
  MARK_SW_WAITING
} from "./actionTypes";

import {
  SubjectDataInterface,
  PeriodInfoInterface
} from '../types/actions';
import {
  PeriodsActionsInterface,
  SubjectActionInterface
} from '../types/reducers';

import uuidv1 from 'uuid/v1';

export const addSubject = (subjectData: SubjectDataInterface): SubjectActionInterface => ({
  type: ADD_SUBJECT,
  payload: {
    id: uuidv1(),
    subjectData
  }
});

export const removeSubject = (subjectID: string): SubjectActionInterface => ({
  type: REMOVE_SUBJECT,
  payload: {
    id: subjectID
  }
});

export const updateSubject = (sub_id: string, subjectData: SubjectDataInterface): SubjectActionInterface => ({
  type: UPDATE_SUBJECT,
  payload: {
    id: sub_id,
    subjectData
  }
});

export const clearSubjects = () => ({
  type: CLEAR_SUBJECTS,
});

export const addPeriod = (subjectID: string, periodInfo: PeriodInfoInterface): PeriodsActionsInterface => ({
  /*
  {
    type: 'ADD_PERIOD',
    payload: {
      id: "2",
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

export const clearPeriods = () => ({
  type: CLEAR_PERIODS,
});

/* Service worker actions */

export const markSwNotWaiting = () => ({
  type: MARK_SW_NOT_WAITING
});

export const markSwWaiting = () => ({
  type: MARK_SW_WAITING
});