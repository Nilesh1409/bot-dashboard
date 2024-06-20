// src/AuthStatus.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Signed in as {user.displayName}</p>
          <img src={user.photoURL} alt="User profile" />
        </div>
      ) : (
        <p>No user signed in</p>
      )}
    </div>
  );
};

export default AuthStatus;
