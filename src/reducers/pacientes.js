import {
  GET_PACIENTES, FETCH_ERROR,
} from '../actions/pacientes';

const INITIAL_STATE = {
  pacientes: [],
  fetchError: '',
};

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case GET_PACIENTES:
      return {
        ...state,
        pacientes: action.payload,
        fetchError: '',
      };
    case FETCH_ERROR:
      return {
        ...state,
        fetchError: action.payload,
      };
    default:
      return state;
  }
}
