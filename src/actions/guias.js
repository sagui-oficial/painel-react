import { APIResquest } from '../utils/api';

export const GET_GUIAS = 'GET_GUIAS';
export const GET_GUIA_DETAILS = 'GET_GUIA_DETAILS';
export const SAVE_GUIA = 'SAVE_GUIA';
export const DELETE_GUIA = 'DELETE_GUIA';
export const UPDATE_GUIA = 'UPDATE_GUIA';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadGuias() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'gto',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_GUIAS,
        payload: typeof res.Result.GTOs !== 'undefined' ? res.Result.GTOs : [],
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function addGuia(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'gto',
      method: 'POST',
      data,
    })
      .then(res => dispatch({
        type: SAVE_GUIA,
        payload: typeof res.Result.GTO !== 'undefined' ? res.Result.GTO : {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function loadGuiaDetail(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `gto/${id}`,
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_GUIA_DETAILS,
        payload: typeof res.Result.GTO !== 'undefined' ? res.Result.GTO : {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function updateGuia(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'gto',
      method: 'PATCH',
      data,
    })
      .then(res => dispatch({
        type: UPDATE_GUIA,
        payload: typeof res.Result.GTO !== 'undefined' ? res.Result.GTO : {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deleteGuia(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `gto/${id}`,
      method: 'PATCH',
    })
      .then(() => dispatch({
        type: DELETE_GUIA,
        payload: id,
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
