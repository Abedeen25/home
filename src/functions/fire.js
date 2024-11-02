// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_fire_apikey,
  authDomain: process.env.REACT_APP_fire_authDomain,
  projectId: process.env.REACT_APP_fire_projectId,
  storageBucket: process.env.REACT_APP_fire_storageBucket,
  messagingSenderId: process.env.REACT_APP_fire_messagingSenderId,
  appId: process.env.REACT_APP_fire_appId,
  measurementId: process.env.REACT_APP_fire_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreC = getFirestore(app);

export { app, firestoreC };
