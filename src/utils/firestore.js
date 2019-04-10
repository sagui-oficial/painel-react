import firebase from 'firebase/app';
import 'firebase/firestore';
import { env } from './config';

const fireSettings = {
  apiKey: env.REACT_APP_APIKEY,
  authDomain: env.REACT_APP_AUTHDOMAIN,
  databaseURL: env.REACT_APP_DATABASEURL,
  projectId: env.REACT_APP_PROJECTID,
  storageBucket: env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: env.REACT_APP_MESSAGINGSENDERID,
};

const connectDB = firebase.initializeApp(fireSettings);

export default connectDB;
