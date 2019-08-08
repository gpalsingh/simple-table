import { EditingSubStateType } from "../../types/store";
import { EditingSubActionType } from "../../types/actions";
import { SET_EDITING_SUBJECT, SET_EDITING_SUBJECT_DONE } from "../actionTypes";

const defaultState = {
  mode_on: false,
  sub_id: ''
}

const editingSubject = (state: EditingSubStateType = defaultState, action: EditingSubActionType) => {
  const { payload } = action;
  switch (action.type) {
    case SET_EDITING_SUBJECT:
      if (!payload) return state;
      return {
        mode_on: true,
        sub_id: payload.sub_id
      };

    case SET_EDITING_SUBJECT_DONE:
      return {
        ...state,
        mode_on: false
      };

    default:
      return state;
  }
};

export default editingSubject;