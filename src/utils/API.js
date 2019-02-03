import axios from 'axios';

export const API = 'http://localhost:8080';

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

    if (config.method === 'POST' || config.method === 'PUT') {
      settings.data = JSON.stringify({ ...config.data });
    }

    return settings;
  };

  const promiseResquestAPI = async () => {
    try {
      const { data } = await axios(`${API}/${config.uri}`, requestConfig());
      return data;
    } catch (err) {
      const messsage = 'Estamos sem conexão.';
      throw messsage;
    }
  };

  return promiseResquestAPI();
};

export default { API, APIResquest };
