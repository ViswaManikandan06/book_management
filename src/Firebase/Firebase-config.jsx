// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5_li0vTHv2sLpDJjEG_ZsAq5lTc4VXvk",
  authDomain: "devrev-bbdfb.firebaseapp.com",
  projectId: "devrev-bbdfb",
  storageBucket: "devrev-bbdfb.appspot.com",
  messagingSenderId: "69791583494",
  appId: "1:69791583494:web:be84f4a1a5d2bd4f28a287",
  measurementId: "G-MKEHJX0RKR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
