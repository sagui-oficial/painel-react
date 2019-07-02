import axios from 'axios';

/**
 * API BACKEND
 */
export const API = process.env.REACT_APP_STAGE === 'development' ? process.env.REACT_APP_API_DEVELOPMENT : process.env.REACT_APP_API_PRODUCTION;

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
      },
    };

    if (/(POST|PUT|PATCH)/gi.test(config.method)) {
      settings.data = JSON.stringify({ ...config.data });
    }

    return settings;
  };

  const promiseResquestAPI = async () => {
    try {
      const { data } = await axios(`${API}/${config.uri}`, requestConfig());
      return data;
    } catch (err) {
      const messsage = 'Error: Tente novamente.';
      throw messsage;
    }
  };

  return promiseResquestAPI();
};

export default { APIResquest };
