import {
  ADD_PERIOD,
  REMOVE_PERIOD,
  CLEAR_PERIODS
} from "../actionTypes";
import {
  PeriodsActionsInterface
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

    case CLEAR_PERIODS:
      return [...initialState];

    default:
      return state;
  }
};

export default periods;