export interface SubjectDataInterface {
  subject_name: string,
  short_name: string,
  teacher_name: string
}

export interface PeriodInfoInterface {
  day: number,
  periodNo: number
}

export type EditingSubActionType = {
  type: string,
  payload?: {
    sub_id: string
  }
}