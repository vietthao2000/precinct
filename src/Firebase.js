import * as firebase from 'firebase';

var config;

if (process.env.ENVIRONMENT === 'development') {
  config = {
    apiKey: "AIzaSyAJREnQb0EnCtxIq0nb3S86NKzcbqmOlWs",
    authDomain: "techkids-police-test.firebaseapp.com",
    databaseURL: "https://techkids-police-test.firebaseio.com",
    projectId: "techkids-police-test",
    storageBucket: "techkids-police-test.appspot.com",
    messagingSenderId: "759129514657"
  };
} else {
  config = {
    apiKey: "AIzaSyC0JzZKXQwOnUQd-zCWgvTFsXlrclSjYWY",
    authDomain: "techkids-police-production.firebaseapp.com",
    databaseURL: "https://techkids-police-production.firebaseio.com",
    projectId: "techkids-police-production",
    storageBucket: "techkids-police-production.appspot.com",
    messagingSenderId: "806601575009"
  }
}

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();

// export default { firebase, firestore: firebase.firestore() };