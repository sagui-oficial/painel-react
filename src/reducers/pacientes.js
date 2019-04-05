import {
  GET_PACIENTES, GET_PACIENTE_DETAILS,
  SAVE_PACIENTE, DELETE_PACIENTE,
  UPDATE_PACIENTE, FETCH_ERROR,
} from '../actions/pacientes';

const INITIAL_STATE = {
  paciente: {},
  pacientes: [],
  fetchError: '',
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_PACIENTES:
      return {
        ...state,
        pacientes: payload,
        fetchError: '',
      };
    case GET_PACIENTE_DETAILS:
      return {
        ...state,
        paciente: payload,
        fetchError: '',
      };
    case SAVE_PACIENTE:
      return {
        ...state,
        paciente: payload,
        fetchError: '',
      };
    case UPDATE_PACIENTE:
      return {
        ...state,
        paciente: payload,
        fetchError: '',
      };
    case DELETE_PACIENTE:
      return {
        ...state,
        pacientes: state.pacientes.filter(item => (
          item.PublicID !== payload
        )),
        fetchError: '',
      };
    case FETCH_ERROR:
      return {
        ...state,
        fetchError: payload,
      };
    default:
      return state;
  }
}
