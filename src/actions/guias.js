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
      uri: 'gto/listargto',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_GUIAS, payload: res.filter(item => item.Status !== 99),
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function addGuia(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'gto/criargto',
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
      uri: `gto/${id}/obtergto`,
      method: 'GET',
    })
      .then(res => dispatch({ type: GET_GUIA_DETAILS, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function updateGuia(data, id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `gto/${id}/atualizargto`,
      method: 'PATCH',
      data,
    })
      .then(res => dispatch({ type: UPDATE_GUIA, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deleteGuia(data, id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `gto/${id}/deletargto`,
      method: 'PATCH',
      data,
    })
      .then(() => dispatch({ type: DELETE_GUIA, payload: id }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
