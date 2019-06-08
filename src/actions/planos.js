import { APIResquest } from '../utils/api';

export const GET_PLANOS = 'GET_PLANOS';
export const GET_PLANO_DETAILS = 'GET_PLANO_DETAILS';
export const SAVE_PLANO = 'SAVE_PLANO';
export const DELETE_PLANO = 'DELETE_PLANO';
export const UPDATE_PLANO = 'UPDATE_PLANO';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadPlanos() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'planooperadora',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PLANOS,
        payload: res.Result.PlanosOperadoras || [],
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function addPlano(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'planooperadora',
      method: 'POST',
      data,
    })
      .then(res => dispatch({
        type: SAVE_PLANO,
        payload: res.Result.PlanoOperadora || {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function loadPlanoDetail(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `planooperadora/${id}`,
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PLANO_DETAILS,
        payload: res.Result.PlanoOperadora || {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function updatePlano(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'planooperadora',
      method: 'PATCH',
      data,
    })
      .then(res => dispatch({
        type: UPDATE_PLANO,
        payload: res.Result.PlanoOperadora || {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deletePlano(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `planooperadora/${id}`,
      method: 'PATCH',
    })
      .then(() => dispatch({
        type: DELETE_PLANO,
        payload: id,
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
