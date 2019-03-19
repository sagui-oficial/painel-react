import { combineReducers } from 'redux';
import guiasReducer from './guias';
import pacientesReducer from './pacientes';
import procedimentosReducer from './procedimentos';
import searchReducer from './search';

export default combineReducers({
  guiasReducer,
  pacientesReducer,
  procedimentosReducer,
  searchReducer,
});
