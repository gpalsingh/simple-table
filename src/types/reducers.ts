import {
  PeriodInfoInterface,
  SubjectDataInterface
} from './actions';

export interface PeriodsPayloadInterface {
  id?: number,
  periodInfo: PeriodInfoInterface
}

export interface PeriodsActionsInterface {
  type: string,
  payload: PeriodsPayloadInterface
}

export interface PeriodsCellInterface {
  sub_id: number | undefined
}

export interface SubjectPayloadInterface {
  id: number,
  subjectData?: SubjectDataInterface
}

export interface SubjectActionInterface {
  type: string,
  payload: SubjectPayloadInterface
}

export type AddSubjectType = (subjectData: SubjectDataInterface) => SubjectActionInterface;
export type RemoveSubjectType = (subjectID: number) => SubjectActionInterface;
export type AddPeriodType = (subjectID: number, periodInfo: PeriodInfoInterface) => PeriodsActionsInterface;
//export type RemovePeriodType = (periodInfo: PeriodInfoInterface) => PeriodsActionsInterface;