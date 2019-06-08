import { APIResquest } from '../utils/api';

export const GET_PROCEDIMENTOS = 'GET_PROCEDIMENTOS';
export const GET_PROCEDIMENTO_DETAILS = 'GET_PROCEDIMENTO_DETAILS';
export const GET_PROCEDIMENTOS_OPERADORA = 'GET_PROCEDIMENTOS_OPERADORA';
export const SAVE_PROCEDIMENTO = 'SAVE_PROCEDIMENTO';
export const DELETE_PROCEDIMENTO = 'DELETE_PROCEDIMENTO';
export const UPDATE_PROCEDIMENTO = 'UPDATE_PROCEDIMENTO';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadProcedimentos() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'procedimento',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PROCEDIMENTOS,
        payload: res.Result.Procedimentos || [],
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function addProcedimento(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'procedimento',
      method: 'POST',
      data,
    })
      .then(res => dispatch({
        type: SAVE_PROCEDIMENTO,
        payload: res.Result.Procedimento || {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function loadProcedimentoDetail(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `procedimento/${id}`,
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PROCEDIMENTO_DETAILS,
        payload: res.Result.Procedimento || {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function loadProcedimentosOperadora(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `procedimento/${id}/procedimento_operadora`,
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PROCEDIMENTOS_OPERADORA,
        payload: res.Result.Procedimentos || [],
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function updateProcedimento(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'procedimento',
      method: 'PATCH',
      data,
    })
      .then(res => dispatch({
        type: UPDATE_PROCEDIMENTO,
        payload: res.Result.Procedimento || {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deleteProcedimento(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `procedimento/${id}`,
      method: 'PATCH',
    })
      .then(() => dispatch({
        type: DELETE_PROCEDIMENTO,
        payload: id,
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
