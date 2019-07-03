import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import dashboardReducer from './dashboard';
import lotesReducer from './lotes';
import guiasReducer from './guias';
import pacientesReducer from './pacientes';
import procedimentosReducer from './procedimentos';
import planosReducer from './planos';

export default combineReducers({
  dashboardReducer,
  lotesReducer,
  guiasReducer,
  pacientesReducer,
  procedimentosReducer,
  planosReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
