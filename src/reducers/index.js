import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import lotesReducer from './lotes';
import guiasReducer from './guias';
import pacientesReducer from './pacientes';
import procedimentosReducer from './procedimentos';
import planosReducer from './planos';

export default combineReducers({
  lotesReducer,
  guiasReducer,
  pacientesReducer,
  procedimentosReducer,
  planosReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
