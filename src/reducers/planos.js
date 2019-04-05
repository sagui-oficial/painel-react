import {
  GET_PLANOS, GET_PLANO_DETAILS,
  SAVE_PLANO, DELETE_PLANO,
  UPDATE_PLANO, FETCH_ERROR,
} from '../actions/planos';

const INITIAL_STATE = {
  plano: {},
  planos: [],
  fetchError: '',
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_PLANOS:
      return {
        ...state,
        planos: payload,
        fetchError: '',
      };
    case GET_PLANO_DETAILS:
      return {
        ...state,
        plano: payload,
        fetchError: '',
      };
    case SAVE_PLANO:
      return {
        ...state,
        plano: payload,
        fetchError: '',
      };
    case UPDATE_PLANO:
      return {
        ...state,
        plano: payload,
        fetchError: '',
      };
    case DELETE_PLANO:
      return {
        ...state,
        planos: state.planos.filter(item => (
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
