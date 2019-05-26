import {
  ADD_PERIOD,
  REMOVE_PERIOD } from "../actionTypes";
import {
  PeriodsActionsInterface,
  PeriodsCellInterface
} from '../../types/reducers';
import { StatePeriodsDataInterface } from '../../types/store';
import update from 'immutability-helper';

const initialState = [[],[],[],[],[],[]]; //Six days

const periods = (state: StatePeriodsDataInterface = initialState, action: PeriodsActionsInterface) => {
  let day, periodNo;

  switch(action.type) {
    case ADD_PERIOD:
      const { id, periodInfo } = action.payload;
      ({ day, periodNo } = periodInfo);
      return update(state, {
        [day]: {
          [periodNo]: {
            $set: { sub_id: id },
          }
        }
      });

    case REMOVE_PERIOD:
      ({ day, periodNo } = action.payload.periodInfo);
      return update(state, {
        [day]: {
          [periodNo]: {
            $unset: ["sub_id"]
          }
        }
      });

    default:
      return state;
  }
};

export default periods;