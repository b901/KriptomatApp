import axios from 'axios';
import {COINGECKO_URI} from './apiConstants';

type PriceHistoryPayload = {
  id: string;
  from: string;
  to: string;
};

export const getCoins = async () => {
  try {
    const response = await axios.get(
      `${COINGECKO_URI}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getPriceHistory = async (payload: PriceHistoryPayload) => {
  try {
    const response = await axios.get(
      `${COINGECKO_URI}/coins/${payload.id}/market_chart/range?vs_currency=eur&from=${payload.from}&to=${payload.to}`,
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
