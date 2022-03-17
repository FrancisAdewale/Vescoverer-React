import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA3RqIQZzvJfUWxsicl_YAalCTqI0zgp7I",
  authDomain: "vescoverer-react.firebaseapp.com",
  projectId: "vescoverer-react",
  storageBucket: "vescoverer-react.appspot.com",
  messagingSenderId: "622349327567",
  appId: "1:622349327567:web:d67440527a1c96f4e86bba"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider(); 

export {auth , provider};