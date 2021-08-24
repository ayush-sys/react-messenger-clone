import React from "react";
import {FaGoogle,FaFacebook} from 'react-icons/fa';
import 'firebase/app';
import {auth} from '../firebase';
import firebase from "firebase/app";


const Login = () => {
    return ( 
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Messenger !</h2>
                <div className="login-button google"
                    onClick={() => {
                        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
                    }}
                >
                    <FaGoogle /> <span className="login-text">Sign in with Google</span>
                </div>
                <br/><br/>
                <div className="login-button facebook"
                    onClick={() => {
                        auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
                    }}
                >
                    <FaFacebook /><span className="login-text">Sign in with Facebook</span>
                </div>
            </div>
        </div>
     );
}
 
export default Login;
