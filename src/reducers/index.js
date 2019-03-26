import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import guiasReducer from './guias';
import pacientesReducer from './pacientes';
import procedimentosReducer from './procedimentos';
import planosReducer from './planos';

export default combineReducers({
  guiasReducer,
  pacientesReducer,
  procedimentosReducer,
  planosReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
