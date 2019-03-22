import { combineReducers } from 'redux';
import guiasReducer from './guias';
import pacientesReducer from './pacientes';
import procedimentosReducer from './procedimentos';
import planosReducer from './planos';

export default combineReducers({
  guiasReducer,
  pacientesReducer,
  procedimentosReducer,
  planosReducer,
});
