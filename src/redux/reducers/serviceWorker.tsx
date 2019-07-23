import {
  MARK_SW_WAITING,
  MARK_SW_NOT_WAITING
} from '../actionTypes';

const initialState = {
  status: 'none'
}

type swActionType = {
  type: string
}

const swReducer = (state = initialState, action: swActionType) => {
  switch (action.type) {
    case MARK_SW_NOT_WAITING:
      /* Just reset the state */
      return initialState;

    case MARK_SW_WAITING:
      return {
        status: "waiting"
      };

    default:
      return state;
  }
};

export default swReducer;