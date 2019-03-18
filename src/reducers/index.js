import { combineReducers } from 'redux';
import guiasReducer from './guias';
import pacientesReducer from './pacientes';
import searchReducer from './search';

export default combineReducers({
  guiasReducer,
  pacientesReducer,
  searchReducer,
});
