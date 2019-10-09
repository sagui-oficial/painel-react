import axios from 'axios';
import { REACT_APP_STAGE } from '../config/variables';

/**
 * API BACKEND
 */
export const API = process.env[`REACT_APP_API_${REACT_APP_STAGE}`];

/**
 * Call to API from url
 * @param {method and headers} config
 */
export const APIResquest = (config) => {
  const requestConfig = () => {
    const settings = {
      method: config.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env[`REACT_APP_ORIGIN_${REACT_APP_STAGE}`],
      },
    };

    const { token } = config;

    if (token) {
      settings.withCredentials = true;
      settings.headers.Authorization = `Basic ${token}`;
    }

    if (/(POST|PUT|PATCH)/gi.test(config.method)) {
      settings.data = JSON.stringify({ ...config.data });
    }

    return settings;
  };

  const promiseResquestAPI = async () => {
    try {
      const API_URL_FROM = config.api ? config.api : API;
      const { data } = await axios(`${API_URL_FROM}/${config.uri}`, requestConfig());
      return data;
    } catch (err) {
      const messsage = 'Error: Tente novamente.';
      throw messsage;
    }
  };

  return promiseResquestAPI();
};

export default { APIResquest };
