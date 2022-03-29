import {combineReducers} from 'redux';
import coins from './coinsReducer';
import priceHistory from './priceHistoryReducer';

const rootReducer = combineReducers({coins, priceHistory});

export default rootReducer;
