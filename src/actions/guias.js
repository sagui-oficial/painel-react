import { APIResquest } from '../utils/API';

export const GET_GUIAS = 'GET_GUIAS';
export const SAVE_GUIAS = 'SAVE_GUIAS';
export const DELETE_GUIAS = 'DELETE_GUIAS';

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

export function deleteGuias(id) {
  return (dispatch) => {
    APIResquest({
      uri: `guias/${id}`,
      method: 'DELETE',
      data: id,
    }).then((res) => {
      dispatch({ type: DELETE_GUIAS, payload: res });
    });
  };
}
