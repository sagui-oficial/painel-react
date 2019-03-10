import {
  GET_GUIAS, SAVE_GUIA, DELETE_GUIA, UPDATE_GUIA,
  GET_GUIA_DETAILS, FETCH_ERROR,
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
        guias: action.payload.filter(item => item.status !== 99),
        fetchError: '',
      };
    case GET_GUIA_DETAILS:
      return {
        ...state,
        guias: action.payload,
        fetchError: '',
      };
    case SAVE_GUIA:
      return {
        ...state,
        guias: state.guias.concat([action.payload]),
        fetchError: '',
      };
    case UPDATE_GUIA:
      return {
        ...state,
        guias: state.guias.map((guia) => {
          if (guia.id === action.payload.id) {
            return {
              ...guia,
              status: action.payload.status,
            };
          }

          return guia;
        }),
        fetchError: '',
      };
    case DELETE_GUIA:
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
