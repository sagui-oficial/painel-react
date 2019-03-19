import { SEARCH, RESET_SEARCH } from '../actions/search';

const INITIAL_STATE = {
  inputValue: '',
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SEARCH:
      return { inputValue: payload };
    case RESET_SEARCH:
      return state.inputValue;
    default:
      return state;
  }
}
