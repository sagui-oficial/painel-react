import { APIResquest } from '../utils/api';

export const GET_PACIENTES = 'GET_PACIENTES';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadPatients() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'pacientes',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PACIENTES, payload: res,
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
