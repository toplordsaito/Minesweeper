import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBp-WQGVKw4opmwuHteFpihZOpg631Yd30",
  authDomain: "minesweeper-cf877.firebaseapp.com",
  databaseURL: "https://minesweeper-cf877.firebaseio.com",
  projectId: "minesweeper-cf877",
  storageBucket: "minesweeper-cf877.appspot.com",
  messagingSenderId: "753300011946",
  appId: "1:753300011946:web:f3b61e7aa5d9704dc0c9d3",
  measurementId: "G-NKD41Z1J9H"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore()
