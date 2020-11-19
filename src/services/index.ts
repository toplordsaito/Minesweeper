import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore()
