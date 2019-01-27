/* global fetch */
export const API = 'http://localhost:8080';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const APIResquest = (config) => {
  const requestConfig = () => {
    const settings = {
      method: config.method,
      headers,
    };

    if (config.method === 'POST' || config.method === 'PUT') {
      settings.body = JSON.stringify({ ...config.data });
    }

    return settings;
  };

  return fetch(`${API}/${config.uri}`, requestConfig())
    .then((response) => {
      if (response.status !== 500) {
        return response.json();
      }

      return true;
    })
    .then(data => data)
    .catch((error) => { console.warn('Request failed', error); });
};

export default { API, APIResquest };
