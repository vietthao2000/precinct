import * as firebase from 'firebase';

var config;

if (process.env.NODE_ENV === 'development') {
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
    apiKey: "AIzaSyBubaiMXyO0Y_XQTwWN6isJ1lzsfCE60xY",
    authDomain: "techkids-police.firebaseapp.com",
    databaseURL: "https://techkids-police.firebaseio.com",
    projectId: "techkids-police",
    storageBucket: "techkids-police.appspot.com",
    messagingSenderId: "908532066309"
  }
}

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();

// export default { firebase, firestore: firebase.firestore() };