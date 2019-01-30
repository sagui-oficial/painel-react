import { combineReducers } from 'redux';
import guiasReducer from './guias';
import searchReducer from './search';

export default combineReducers({
  guiasReducer,
  searchReducer,
});
