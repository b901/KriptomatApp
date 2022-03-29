import * as type from '../types';

export function getPriceHistoryStart(id: string, from: string, to: string) {
  return {
    type: type.GET_PRICE_HISTORY_START,
    payload: {id, from, to},
  };
}

export function getPriceHistorySuccess(prices) {
  return {
    type: type.GET_PRICE_HISTORY_SUCCESS,
    payload: prices,
  };
}

export function getPriceHistoryFail(errorMessage) {
  return {
    type: type.GET_PRICE_HISTORY_FAIL,
    payload: errorMessage,
  };
}
