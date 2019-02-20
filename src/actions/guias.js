// import io from 'socket.io-client';

import { APIResquest } from '../utils/API';

export const GET_GUIAS = 'GET_GUIAS';
export const SAVE_GUIAS = 'SAVE_GUIAS';
export const DELETE_GUIAS = 'DELETE_GUIAS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SOCKET_IO = 'SOCKET_IO';

export function loadGuias() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'guias',
      method: 'GET',
    })
      .then(data => dispatch({ type: GET_GUIAS, payload: data }))
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
      .then(res => dispatch({ type: SAVE_GUIAS, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deleteGuias(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `guias/${id}`,
      method: 'DELETE',
      data: id,
    })
      .then(() => dispatch({ type: DELETE_GUIAS, payload: id }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

/* export function connectIO() {
  return (dispatch) => {
    const socket = io('http://localhost:8080/');
    socket.emit('guias');
    socket.on('success', (data) => {
      dispatch({ type: SOCKET_IO, payload: data });
    });
  };
} */
