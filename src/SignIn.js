// src/SignIn.js
import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = result.credential;
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User signed in:", user, token);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default SignIn;
