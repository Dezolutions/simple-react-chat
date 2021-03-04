import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import App from './App';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAQ17nP0LanZ0q2zqNRlmd1papUxWsKSWg",
  authDomain: "chat-react-ae26e.firebaseapp.com",
  projectId: "chat-react-ae26e",
  storageBucket: "chat-react-ae26e.appspot.com",
  messagingSenderId: "661893252893",
  appId: "1:661893252893:web:940d15d61e1841eb5483f4",
  measurementId: "G-SBZ74L5YEX"
});

const auth = firebase.auth()
const firestore = firebase.firestore()

export const Context = createContext(null)

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{
      firebase,
      auth,
      firestore
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


