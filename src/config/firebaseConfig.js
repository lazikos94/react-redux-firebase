import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOeHvySM6JbIdUqfqqfRlPyF62FrTFXIg",
    authDomain: "redux-firebase-tutorial-7bd04.firebaseapp.com",
    databaseURL: "https://redux-firebase-tutorial-7bd04.firebaseio.com",
    projectId: "redux-firebase-tutorial-7bd04",
    storageBucket: "redux-firebase-tutorial-7bd04.appspot.com",
    messagingSenderId: "1068453612461",
    appId: "1:1068453612461:web:330795d776a75ada392f24",
    measurementId: "G-GMHLQ7Y6HR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
