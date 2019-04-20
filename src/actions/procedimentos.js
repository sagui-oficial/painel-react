import { APIResquest } from '../utils/api';

export const GET_PROCEDIMENTOS = 'GET_PROCEDIMENTOS';
export const GET_PROCEDIMENTO_DETAILS = 'GET_PROCEDIMENTO_DETAILS';
export const SAVE_PROCEDIMENTO = 'SAVE_PROCEDIMENTO';
export const DELETE_PROCEDIMENTO = 'DELETE_PROCEDIMENTO';
export const UPDATE_PROCEDIMENTO = 'UPDATE_PROCEDIMENTO';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadProcedimentos() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'procedimentos',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PROCEDIMENTOS, payload: res.filter(item => item.Status !== 99),
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function addProcedimento(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'procedimentos',
      method: 'POST',
      data,
    })
      .then(res => dispatch({ type: SAVE_PROCEDIMENTO, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function loadProcedimentoDetail(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `procedimentos/${id}`,
      method: 'GET',
    })
      .then(res => dispatch({ type: GET_PROCEDIMENTO_DETAILS, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function updateProcedimento(data, id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `procedimentos/${id}`,
      method: 'PUT',
      data,
    })
      .then(res => dispatch({ type: UPDATE_PROCEDIMENTO, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deleteProcedimento(data, id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `procedimentos/${id}`,
      method: 'DELETE',
      data,
    })
      .then(() => dispatch({ type: DELETE_PROCEDIMENTO, payload: id }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
