import { GET_GUIAS, SAVE_GUIAS } from '../actions/guias';

const initialState = {
  guias: [],
  guia: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case GET_GUIAS:
      return {
        ...state,
        guias: action.payload,
      };
    case SAVE_GUIAS:
      return {
        ...state,
        guias: state.guias.concat([action.payload]),
      };
    default:
      return state;
  }
}
