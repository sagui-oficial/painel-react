import { APIResquest } from '../utils/api';

export const GET_GUIAS = 'GET_GUIAS';
export const GET_GUIA_DETAILS = 'GET_GUIA_DETAILS';
export const SAVE_GUIA = 'SAVE_GUIA';
export const DELETE_GUIA = 'DELETE_GUIA';
export const UPDATE_GUIA_STATUS = 'UPDATE_GUIA_STATUS';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadGuias() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'guias',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_GUIAS, payload: res,
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function addGuia(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'guias',
      method: 'POST',
      data,
    })
      .then(res => dispatch({ type: SAVE_GUIA, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function loadGuiaDetail(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `guias/${id}`,
      method: 'GET',
    })
      .then(res => dispatch({ type: GET_GUIA_DETAILS, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function updateGuiaStatus(data, id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `guias/${id}`,
      method: 'PUT',
      data,
    })
      .then(res => dispatch({ type: UPDATE_GUIA_STATUS, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deleteGuia(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `guias/${id}`,
      method: 'DELETE',
    })
      .then(() => dispatch({ type: DELETE_GUIA, payload: id }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
