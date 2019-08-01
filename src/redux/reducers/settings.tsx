import { FLIP_TIME_TABLE } from "../actionTypes";
import { StateSettingsType } from "../../types/store";

type settingsActionType = {
  type: string
}

const defaultState = {
  timetable_flipped: false,
}

const settings = (state: StateSettingsType = defaultState, action: settingsActionType) => {
  switch (action.type) {
    case FLIP_TIME_TABLE:
      return {
        ...state,
        timetable_flipped: !state.timetable_flipped
      };

    default:
      return state;
  }
}

export default settings;