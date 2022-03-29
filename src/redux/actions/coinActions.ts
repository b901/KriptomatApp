import * as type from '../types';

export function getCoinsStart() {
  return {
    type: type.GET_COINS_START,
  };
}

export function getCoinsSuccess(coins) {
  return {
    type: type.GET_COINS_SUCCESS,
    payload: coins,
  };
}

export function getCoinsFail(errorMessage) {
  return {
    type: type.GET_COINS_FAIL,
    payload: errorMessage,
  };
}
