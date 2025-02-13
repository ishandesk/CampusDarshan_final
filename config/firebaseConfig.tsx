// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy9soFaD-wgjqNSZ_UtWuK3GiZsOaLxtQ",
  authDomain: "campus-darshan.firebaseapp.com",
  projectId: "campus-darshan",
  storageBucket: "campus-darshan.firebasestorage.app",
  messagingSenderId: "508408488262",
  appId: "1:508408488262:web:0ea5d8fdca14055af2c547",
  measurementId: "G-MVGJWQX32K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 
// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };