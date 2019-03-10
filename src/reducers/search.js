import { SEARCH } from '../actions/search';

const INITIAL_STATE = {
  inputValue: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH:
      return { inputValue: action.payload };
    default:
      return state;
  }
}
