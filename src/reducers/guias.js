import {
  GET_GUIAS, SAVE_GUIAS, DELETE_GUIAS, FETCH_ERROR,
} from '../actions/guias';

const INITIAL_STATE = {
  guias: [],
  fetchError: '',
};

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case GET_GUIAS:
      return {
        ...state,
        guias: action.payload,
        fetchError: '',
      };
    case SAVE_GUIAS:
      return {
        ...state,
        guias: state.guias.concat([action.payload]),
        fetchError: '',
      };
    case DELETE_GUIAS:
      return {
        ...state,
        guias: state.guias.filter(guia => guia.id !== action.payload),
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
