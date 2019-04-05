import {
  GET_PROCEDIMENTOS, GET_PROCEDIMENTO_DETAILS,
  SAVE_PROCEDIMENTO, DELETE_PROCEDIMENTO,
  UPDATE_PROCEDIMENTO, FETCH_ERROR,
} from '../actions/procedimentos';

const INITIAL_STATE = {
  procedimento: {},
  procedimentos: [],
  fetchError: '',
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_PROCEDIMENTOS:
      return {
        ...state,
        procedimentos: payload,
        fetchError: '',
      };
    case GET_PROCEDIMENTO_DETAILS:
      return {
        ...state,
        procedimento: payload,
        fetchError: '',
      };
    case SAVE_PROCEDIMENTO:
      return {
        ...state,
        procedimento: payload,
        fetchError: '',
      };
    case UPDATE_PROCEDIMENTO:
      return {
        ...state,
        procedimento: payload,
        fetchError: '',
      };
    case DELETE_PROCEDIMENTO:
      return {
        ...state,
        procedimentos: state.procedimentos.filter(item => (
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
