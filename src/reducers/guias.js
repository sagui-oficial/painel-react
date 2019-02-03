import {
  GET_GUIAS, SAVE_GUIAS, DELETE_GUIAS, FETCH_ERROR,
} from '../actions/guias';

const INITIAL_STATE = {
  guias: [],
  fetchError: null,
};

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case GET_GUIAS:
      return {
        ...state,
        guias: action.payload,
        fetchError: null,
      };
    case SAVE_GUIAS:
      return {
        ...state,
        guias: state.guias.concat([action.payload]),
        fetchError: null,
      };
    case DELETE_GUIAS:
      return {
        ...state,
        guias: state.guias.filter(guia => guia.id !== action.payload),
        fetchError: null,
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
