import {
  ADD_PERIOD,
  REMOVE_PERIOD } from "../actionTypes";
import update from 'immutability-helper';

const initialState = [[],[],[],[],[],[]]; //Six days

const periods = (state = initialState, action) => {

  switch(action.type) {
    case ADD_PERIOD:
      const { id, periodInfo } = action.payload;
      const { day, periodNo } = periodInfo;
      return update(state, {
        [day]: {
          [periodNo]: {
            $set: { sub_id: id },
          }
        }
      });

    case REMOVE_PERIOD:
      const { rday, rperiodNo } = action.payload.periodInfo;
      return update(state, {
        [rday]: {
          [rperiodNo]: {
            $set: {}
          }
        }
      });

    default:
      return state;
  }
};

export default periods;