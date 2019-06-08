import {
  GET_LOTES, SAVE_LOTE, DELETE_LOTE, UPDATE_LOTE,
  GET_LOTE_DETAILS, FETCH_ERROR,
} from '../actions/lotes';

const INITIAL_STATE = {
  lote: {},
  lotes: [],
  fetchError: '',
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_LOTES:
      return {
        ...state,
        lotes: payload,
        fetchError: '',
      };
    case GET_LOTE_DETAILS:
      return {
        ...state,
        lote: payload,
        fetchError: '',
      };
    case SAVE_LOTE:
      return {
        ...state,
        lote: payload,
        fetchError: '',
      };
    case UPDATE_LOTE:
      return {
        ...state,
        lotes: state.lotes.map((item) => {
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
    case DELETE_LOTE:
      return {
        ...state,
        lotes: state.lotes.filter(item => item.PublicID !== payload),
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
