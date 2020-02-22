const axios = require('axios');
const PROXY_URI = 'https://cors-anywhere.herokuapp.com/';
const OPTIONS_BASE_URI = 'https://query2.finance.yahoo.com/v7/finance/options/';
const FUNDAMENTALS_BASE_URI = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/';
const QUOTE_BASE_URI = 'https://query2.finance.yahoo.com/v7/finance/quote?symbols=';

const getOptions = async (ticker, expiry = null) => {
  if (!expiry) {
    let { data } = await axios.get(`${PROXY_URI}${OPTIONS_BASE_URI}${ticker}`);
  } else {
    let { data } = await axios.get(`${PROXY_URI}${OPTIONS_BASE_URI}${ticker}?date=${expiry}`);
  }
  return data.optionChain.result[0];
};

const getExpiries = async (ticker, expiry = null) => {
  let { data } = await axios.get(`${PROXY_URI}${OPTIONS_BASE_URI}${ticker}`);
  return data.optionChain.result[0].expirationDates;
}

const getFundamentals = async (ticker, modules) => {
  let { data } = await axios.get(`${PROXY_URI}${FUNDAMENTALS_BASE_URI}${ticker}?modules=assetProfile`);
  return data;
};

exports.getOptions = getOptions;
exports.getFundamentals = getFundamentals;
exports.getExpiries = getExpiries;