import {call, put, takeEvery} from 'redux-saga/effects';
import {getPriceHistory} from '../../api/coinGecko';
import {
  getPriceHistorySuccess,
  getPriceHistoryFail,
} from '../actions/priceHistoryActions';
import * as type from '../types';

function* getPriceHistorySaga(action) {
  try {
    const priceHistory = yield call(getPriceHistory, action.payload);
    yield put(getPriceHistorySuccess(priceHistory.prices));
  } catch (error) {
    yield put(getPriceHistoryFail(error.message));
  }
}

function* watchGetPriceHistory() {
  yield takeEvery(type.GET_PRICE_HISTORY_START, getPriceHistorySaga);
}

export default watchGetPriceHistory;
