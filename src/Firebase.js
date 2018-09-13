import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyBubaiMXyO0Y_XQTwWN6isJ1lzsfCE60xY",
  authDomain: "techkids-police.firebaseapp.com",
  databaseURL: "https://techkids-police.firebaseio.com",
  projectId: "techkids-police",
  storageBucket: "techkids-police.appspot.com",
  messagingSenderId: "908532066309"
}

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();

// export default { firebase, firestore: firebase.firestore() };