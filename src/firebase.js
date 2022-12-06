
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBSwNqNgZRvsIf0MqTSvQbOmV0FXPzJ5zA",
  authDomain: "challenge-7bc4a.firebaseapp.com",
  projectId: "challenge-7bc4a",
  storageBucket: "challenge-7bc4a.appspot.com",
  messagingSenderId: "952536389050",
  appId: "1:952536389050:web:cd27d6a314673a2b6b3983",
  measurementId: "G-ZWF6YYT6Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db,auth ,createUserWithEmailAndPassword,signInWithEmailAndPassword}; 