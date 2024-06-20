// src/SignOut.js
import React from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const SignOut = () => {
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return <button onClick={signOutUser}>Sign Out</button>;
};

export default SignOut;
