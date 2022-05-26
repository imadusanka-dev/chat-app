import React from "react";
import "../styles/Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch({
          type: actionTypes.SET_USER,
          user,
        });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://www.freepnglogos.com/uploads/whatsapp-transparent-logo-20.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to ChatApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
