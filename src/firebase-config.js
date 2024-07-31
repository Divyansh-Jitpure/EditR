// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1mu0Nv7DtEhBaSLoTasug-THynNqibF8",
  authDomain: "the-editr.firebaseapp.com",
  projectId: "the-editr",
  storageBucket: "the-editr.appspot.com",
  messagingSenderId: "1039745812606",
  appId: "1:1039745812606:web:e91299b19c75b5fd50702f",
  measurementId: "G-N5Q5B0ZS2L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
