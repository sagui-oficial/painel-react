import {
  GET_PROCEDIMENTOS, GET_PROCEDIMENTO_DETAILS,
  SAVE_PROCEDIMENTO, DELETE_PROCEDIMENTO,
  UPDATE_PROCEDIMENTO, FETCH_ERROR,
} from '../actions/procedimentos';

const INITIAL_STATE = {
  procedimentos: [],
  fetchError: '',
};

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case GET_PROCEDIMENTOS:
      return {
        ...state,
        procedimentos: action.payload,
        fetchError: '',
      };
    case GET_PROCEDIMENTO_DETAILS:
      return {
        ...state,
        procedimentos: action.payload,
        fetchError: '',
      };
    case SAVE_PROCEDIMENTO:
      return {
        ...state,
        procedimentos: state.procedimentos.concat([action.payload]),
        fetchError: '',
      };
    case UPDATE_PROCEDIMENTO:
      return {
        ...state,
        procedimentos: state.procedimentos.map((item) => {
          if (item.PublicID === action.payload.PublicID) {
            return {
              ...item,
              Status: action.payload.Status,
            };
          }

          return item;
        }),
        fetchError: '',
      };
    case DELETE_PROCEDIMENTO:
      return {
        ...state,
        procedimentos: state.procedimentos.filter(item => (
          item.PublicID !== action.payload
        )),
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
