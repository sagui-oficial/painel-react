import { APIResquest } from '../utils/api';

export const GET_LOTES = 'GET_LOTES';
export const GET_LOTE_DETAILS = 'GET_LOTE_DETAILS';
export const SAVE_LOTE = 'SAVE_LOTE';
export const DELETE_LOTE = 'DELETE_LOTE';
export const UPDATE_LOTE = 'UPDATE_LOTE';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadLotes() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'lote',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_LOTES,
        payload: typeof res.Result.Lotes !== 'undefined' ? res.Result.Lotes : [],
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function addLote(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'lote',
      method: 'POST',
      data,
    })
      .then(res => dispatch({
        type: SAVE_LOTE,
        payload: typeof res.Result.Lote !== 'undefined' ? res.Result.Lote : {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function loadLoteDetail(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `lote/${id}`,
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_LOTE_DETAILS,
        payload: typeof res.Result.Lote !== 'undefined' ? res.Result.Lote : {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function updateLote(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'lote',
      method: 'PATCH',
      data,
    })
      .then(res => dispatch({
        type: UPDATE_LOTE,
        payload: typeof res.Result.Lote !== 'undefined' ? res.Result.Lote : {},
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deleteLote(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `lote/${id}`,
      method: 'PATCH',
    })
      .then(() => dispatch({
        type: DELETE_LOTE,
        payload: id,
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
