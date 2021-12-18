import React, { useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
firebase.initializeApp(firebaseConfig);


const Login = () => {
const [loggedInUser,setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
const { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();
    
    const handleSignIn = ()=>{
        firebase.initializeApp(firebaseConfig);
        // console.log("sign in clikced")
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
      console.log(result)
      const {displayName, email}= result.user;
      const signedInUser = {name:displayName,email:email};
      setLoggedInUser(signedInUser);
      storeAuthToken();
      history.replace(from);
      console.log(signedInUser);
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
      }

      const storeAuthToken = ()=>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          sessionStorage.setItem('token',idToken);
          console.log(idToken)
          // Send token to your backend via HTTPS
          // ...
        }).catch(function(error) {
          // Handle error
        });
      }
    
    return (
        <div>
        
            <h1>This is Login</h1>
            <button onClick={handleSignIn}>Google Sign In</button>
            
        
        </div>
    );
};

export default Login;