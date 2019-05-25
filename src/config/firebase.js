import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { env } from './variables';

const config = {
  apiKey: env.REACT_APP_APIKEY,
  authDomain: env.REACT_APP_AUTHDOMAIN,
  databaseURL: env.REACT_APP_DATABASEURL,
  projectId: env.REACT_APP_PROJECTID,
  storageBucket: env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: env.REACT_APP_MESSAGINGSENDERID,
};

firebase.initializeApp(config);
firebase.firestore();

export const storage = firebase.storage();
export default firebase;
