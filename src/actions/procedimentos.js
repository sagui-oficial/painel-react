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
      uri: 'procedimento',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PROCEDIMENTOS,
        payload: typeof res.Result.Procedimentos !== 'undefined' ? res.Result.Procedimentos : [],
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
        payload: typeof res.Result.Procedimento !== 'undefined' ? res.Result.Procedimento : {},
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
        payload: typeof res.Result.Procedimento !== 'undefined' ? res.Result.Procedimento : {},
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
        payload: typeof res.Result.Procedimento !== 'undefined' ? res.Result.Procedimento : {},
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
