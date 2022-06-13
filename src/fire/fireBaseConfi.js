// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvXNc8H3nT4eq-uH84P3O_63NmSbj4svE",
  authDomain: "loyalty-platform-dbb05.firebaseapp.com",
  databaseURL: "https://loyalty-platform-dbb05-default-rtdb.firebaseio.com",
  projectId: "loyalty-platform-dbb05",
  storageBucket: "loyalty-platform-dbb05.appspot.com",
  messagingSenderId: "70685944907",
  appId: "1:70685944907:web:b7dd6206e80f6b346c31ce",
  measurementId: "G-6ESG4GZ0R5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentica = getAuth(app);