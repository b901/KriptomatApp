import {all} from 'redux-saga/effects';
import watchGetCoins from './coinSaga';
import watchGetPriceHistory from './priceHistorySaga';

export default function* rootSaga() {
  yield all([watchGetCoins(), watchGetPriceHistory()]);
}
