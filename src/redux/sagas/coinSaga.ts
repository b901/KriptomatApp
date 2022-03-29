import {call, put, takeEvery} from 'redux-saga/effects';
import {getCoins} from '../../api/coinGecko';
import {getCoinsSuccess, getCoinsFail} from '../actions/coinActions';
import * as type from '../types';

function* getCoinsSaga() {
  try {
    const coins = yield call(getCoins);
    yield put(getCoinsSuccess(coins));
  } catch (error) {
    yield put(getCoinsFail(error.message));
  }
}

function* watchGetCoins() {
  yield takeEvery(type.GET_COINS_START, getCoinsSaga);
}

export default watchGetCoins;
