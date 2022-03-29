import * as type from '../types';

const INITIAL_STATE = {
  coins: [],
  isLoading: false,
  errorMessage: '',
};

export default function coins(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.GET_COINS_START:
      return {
        ...state,
        isLoading: true,
      };
    case type.GET_COINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coins: action.payload,
        errorMessage: '',
      };
    case type.GET_COINS_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
