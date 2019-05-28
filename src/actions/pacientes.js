import { APIResquest } from '../utils/api';

export const GET_PACIENTES = 'GET_PACIENTES';
export const GET_PACIENTE_DETAILS = 'GET_PACIENTE_DETAILS';
export const SAVE_PACIENTE = 'SAVE_PACIENTE';
export const DELETE_PACIENTE = 'DELETE_PACIENTE';
export const UPDATE_PACIENTE = 'UPDATE_PACIENTE';
export const FETCH_ERROR = 'FETCH_ERROR';

export function loadPacientes() {
  return async (dispatch) => {
    await APIResquest({
      uri: 'pacientes',
      method: 'GET',
    })
      .then(res => dispatch({
        type: GET_PACIENTES, payload: res,
      }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function addPaciente(data) {
  return async (dispatch) => {
    await APIResquest({
      uri: 'pacientes',
      method: 'POST',
      data,
    })
      .then(res => dispatch({ type: SAVE_PACIENTE, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function loadPacienteDetail(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `pacientes/${id}`,
      method: 'GET',
    })
      .then(res => dispatch({ type: GET_PACIENTE_DETAILS, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function updatePaciente(data, id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `pacientes/${id}`,
      method: 'PUT',
      data,
    })
      .then(res => dispatch({ type: UPDATE_PACIENTE, payload: res }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}

export function deletePaciente(id) {
  return async (dispatch) => {
    await APIResquest({
      uri: `pacientes/${id}`,
      method: 'DELETE',
    })
      .then(() => dispatch({ type: DELETE_PACIENTE, payload: id }))
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
  };
}
