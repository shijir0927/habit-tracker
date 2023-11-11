import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCbHClFktn4_tmRM_8UGR6cjydb6Y6qoaU",
  authDomain: "habit-tracker-9736b.firebaseapp.com",
  projectId: "habit-tracker-9736b",
  storageBucket: "habit-tracker-9736b.appspot.com",
  messagingSenderId: "985723193964",
  appId: "1:985723193964:web:132c4b7a681262bce1a649",
  measurementId: "G-Z8BTSH4TNW",
  databaseURL: "https://habit-tracker-9736b-default-rtdb.firebaseio.com/",
};

const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);

export { firebase, database };
