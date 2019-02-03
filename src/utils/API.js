import axios from 'axios';

export const API = 'http://localhost:8080';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Call to API from url
 * @param {method and headers} config
 */
export const APIResquest = (config) => {
  const requestConfig = () => {
    const settings = {
      method: config.method,
      headers,
    };

    if (config.method === 'POST' || config.method === 'PUT') {
      settings.data = JSON.stringify({ ...config.data });
    }

    return settings;
  };

  async function f() {
    try {
      const { data } = await axios(`${API}/${config.uri}`, requestConfig());
      return data;
    } catch (error) {
      throw error;
    }
  }

  return f();
};

export default { API, APIResquest };
