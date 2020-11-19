import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCptejso6F71UWJ7aYCdPw2ndzlvddITE4",
    authDomain: "pokemon-rashadhrrs.firebaseapp.com",
    databaseURL: "https://pokemon-rashadhrrs.firebaseio.com",
    projectId: "pokemon-rashadhrrs",
    storageBucket: "pokemon-rashadhrrs.appspot.com",
    messagingSenderId: "136060930572",
    appId: "1:136060930572:web:34ab727706516d14513c29",
    measurementId: "G-ETGBXBX1JR"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();

  export default db;