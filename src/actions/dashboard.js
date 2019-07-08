import { APIResquest } from '../utils/api';

export const GET_DATA = 'GET_DATA';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadData({ startDate, endDate }) {
  return async (dispatch) => {
    await APIResquest({
      uri: `dashboard/${startDate}/${endDate}`,
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_DATA,
        payload: res.grafico || [],
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
