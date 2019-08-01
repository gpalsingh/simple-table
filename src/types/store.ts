import { PeriodsCellInterface } from './reducers';

export interface StateSubjectDataInterface {
  id: string;
  name: string;
  short_name: string;
  teacher_name: string;
}

export type StatePeriodsDataInterface = PeriodsCellInterface[][];

export type StateSwType = {
  status: "waiting" | "none",
}

export type StateSettingsType = {
  timetable_flipped: boolean
}

export interface StoreStateInterface {
  subjects: StateSubjectDataInterface[],
  periods: StatePeriodsDataInterface,
  sw: StateSwType,
  settings: StateSettingsType
}