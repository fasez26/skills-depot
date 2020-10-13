import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2ZHAKf7EpDqu4Sw9ERDq5q6-efOvCEtY",
    authDomain: "skills-depot.firebaseapp.com",
    databaseURL: "https://skills-depot.firebaseio.com",
    projectId: "skills-depot",
    storageBucket: "skills-depot.appspot.com",
    messagingSenderId: "123664767865",
    appId: "1:123664767865:web:f2e45e918bb18979e5ada8",
    measurementId: "G-QGNFN4P0LV"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {db, auth, app}

