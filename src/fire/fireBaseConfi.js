// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAvXNc8H3nT4eq-uH84P3O_63NmSbj4svE',
  authDomain: 'loyalty-platform-dbb05.firebaseapp.com',
  databaseURL: 'https://loyalty-platform-dbb05-default-rtdb.firebaseio.com',
  projectId: 'loyalty-platform-dbb05',
  storageBucket: 'loyalty-platform-dbb05.appspot.com',
  messagingSenderId: '70685944907',
  appId: '1:70685944907:web:b7dd6206e80f6b346c31ce',
  measurementId: 'G-6ESG4GZ0R5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// function Home() {
//   const navigate = useNavigate();
//   navigate('/dashboard/app');
// };

const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);

    console.log('res: ', res);

    const t = await getToken(res.user.accessToken);
    console.log('firebase token: ', res.user.accessToken);
    console.log('authen token: ', t.data.token);
    console.log('respone', res);
    console.log('t: ', t);

    localStorage.setItem('token', t.data.token);
    console.log(t.data.token);
    window.location.href = '/dashboard/app';
  } catch (err) {
    console.log(err);
  }
};

function getToken(googleToken) {
  return axios.post('https://13.232.213.53/api/v1/auth/login', { idToken: googleToken });
}

const logout = () => {
  signOut(auth);
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export { loginWithGoogle, logout };
