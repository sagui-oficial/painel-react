import axios from 'axios';

/**
 * API BACKEND
 */
export const API = 'http://localhost:8080';
// export const API = 'https://localhost:5001/backoffice/gto';

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

    if (config.method === 'POST' || config.method === 'PATCH') {
      settings.data = JSON.stringify({ ...config.data });
    }

    return settings;
  };

  const promiseResquestAPI = async () => {
    try {
      const { data } = await axios(`${API}/${config.uri}`, requestConfig());
      return data;
    } catch (err) {
      // console.log(JSON.stringify({ err }));
      const messsage = 'Error: Tente novamente.';
      throw messsage;
    }
  };

  return promiseResquestAPI();
};

export default { API, APIResquest };
