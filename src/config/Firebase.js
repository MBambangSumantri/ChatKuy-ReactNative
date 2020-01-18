import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCako2LK4vKFgRME9sFxlJ76ib-80lW3Fc',
  authDomain: 'chatmap-785dc.firebaseapp.com',
  databaseURL: 'https://chatmap-785dc.firebaseio.com',
  projectId: 'chatmap-785dc',
  storageBucket: 'chatmap-785dc.appspot.com',
  messagingSenderId: '220595875082',
  appId: '1:220595875082:web:1fdf259b5cbf2bc9e8def3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
