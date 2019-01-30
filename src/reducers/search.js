import { SEARCH } from '../actions/search';

const INITIAL_STATE = {
  value: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH:
      return { value: action.payload };
    default:
      return state;
  }
}
