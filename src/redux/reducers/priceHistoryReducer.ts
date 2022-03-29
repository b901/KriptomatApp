import * as type from '../types';

const INITIAL_STATE = {
  prices: [],
  isLoading: false,
  errorMessage: '',
};

export default function priceHistory(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.GET_PRICE_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      };
    case type.GET_PRICE_HISTORY_SUCCESS:
      const extractedPrices = [];
      for (let subArr of action.payload) {
        extractedPrices.push(subArr[1]);
      }
      return {
        ...state,
        isLoading: false,
        prices: extractedPrices,
        errorMessage: '',
      };
    case type.GET_PRICE_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
