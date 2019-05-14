import {
  ADD_PERIOD,
  REMOVE_PERIOD } from "../actionTypes";
import update from 'immutability-helper';

const initialState = [[],[],[],[],[],[]]; //Six days

const periods = (state = initialState, action) => {
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
            $set: null
          }
        }
      });

    default:
      return state;
  }
};

export default periods;