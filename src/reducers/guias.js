import {
  GET_GUIAS, SAVE_GUIA, DELETE_GUIA, UPDATE_GUIA_STATUS,
  GET_GUIA_DETAILS, FETCH_ERROR,
} from '../actions/guias';

const INITIAL_STATE = {
  guia: {},
  guias: [],
  fetchError: '',
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_GUIAS:
      return {
        ...state,
        guias: payload,
        fetchError: '',
      };
    case GET_GUIA_DETAILS:
      return {
        ...state,
        guia: payload,
        fetchError: '',
      };
    case SAVE_GUIA:
      return {
        ...state,
        guia: payload,
        fetchError: '',
      };
    case UPDATE_GUIA_STATUS:
      return {
        ...state,
        guias: state.guias.map((item) => {
          if (item.PublicID === payload.PublicID) {
            return {
              ...item,
              Status: payload.Status,
            };
          }

          return item;
        }),
        fetchError: '',
      };
    case DELETE_GUIA:
      return {
        ...state,
        guias: state.guias.filter(item => item.PublicID !== payload),
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
