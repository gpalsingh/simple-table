import {
  PeriodInfoInterface,
  SubjectDataInterface
} from './actions';

export interface PeriodsPayloadInterface {
  id?: string,
  periodInfo: PeriodInfoInterface
}

export interface PeriodsActionsInterface {
  type: string,
  payload: PeriodsPayloadInterface
}

export interface PeriodsCellInterface {
  sub_id: string | undefined
}

export interface SubjectPayloadInterface {
  id: string,
  subjectData?: SubjectDataInterface
}

export interface SubjectActionInterface {
  type: string,
  payload: SubjectPayloadInterface
}

export type AddSubjectType = (subjectData: SubjectDataInterface) => SubjectActionInterface;
export type RemoveSubjectType = (subjectID: string) => SubjectActionInterface;
export type UpdateSubjectType = (sub_id: string, subjectData: SubjectDataInterface) => SubjectActionInterface ;
export type AddPeriodType = (subjectID: number, periodInfo: PeriodInfoInterface) => PeriodsActionsInterface;
export type ClearPeriodsType = () => { type: string }
export type ClearSubjectsType = () => { type: string }
//export type RemovePeriodType = (periodInfo: PeriodInfoInterface) => PeriodsActionsInterface;