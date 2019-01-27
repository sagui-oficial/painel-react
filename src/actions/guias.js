import { APIResquest } from '../utils/API';

export const GET_GUIAS = 'GET_GUIAS';
export const SAVE_GUIAS = 'SAVE_GUIAS';

export function addGuia(data) {
  return (dispatch) => {
    APIResquest({
      uri: 'guias',
      method: 'POST',
      data,
    }).then((res) => {
      dispatch({ type: SAVE_GUIAS, payload: res });
    });
  };
}

export function loadGuias() {
  return (dispatch) => {
    APIResquest({
      uri: 'guias',
      method: 'GET',
    }).then((res) => {
      dispatch({ type: GET_GUIAS, payload: res });
    });
  };
}


export default { loadGuias, addGuia };
