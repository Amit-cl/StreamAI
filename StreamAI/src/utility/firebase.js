// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDROiPWvWB71YYMea6rbLgwOv2dtkZ8jE0",
  authDomain: "streamai-c1d17.firebaseapp.com",
  projectId: "streamai-c1d17",
  storageBucket: "streamai-c1d17.firebasestorage.app",
  messagingSenderId: "821174413666",
  appId: "1:821174413666:web:77de9ffb6da1a7d133a43b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app , auth}
export const provider = new GoogleAuthProvider()