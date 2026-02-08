// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf5ooNddJGVtoFyzrxvBqyR2Mt7KskBPg",
  authDomain: "stream-ai-52378.firebaseapp.com",
  projectId: "stream-ai-52378",
  storageBucket: "stream-ai-52378.firebasestorage.app",
  messagingSenderId: "702427977115",
  appId: "1:702427977115:web:8264f64f9e82f996e07d3e",
  measurementId: "G-6QQ1GRDELW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
// npm install -g firebase-tools
// firebase loginfirebase initfirebase deploy