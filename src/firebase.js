// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8D9HqqOkJbAQELWWDgnhF8jGSOgQlrGY",
  authDomain: "bot-dashbaord.firebaseapp.com",
  projectId: "bot-dashbaord",
  storageBucket: "bot-dashbaord.appspot.com",
  messagingSenderId: "158392880684",
  appId: "1:158392880684:web:b32514020dede238620b89",
  measurementId: "G-JYCKDTX1ES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
