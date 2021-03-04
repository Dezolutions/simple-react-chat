import React, { useContext } from 'react';

import Chat from './components/Chat';
import Login from './components/Login';
import { Navbar, Button } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "./index";

function App() {
  const {auth} = useContext(Context)
  const [user] = useAuthState(auth)
  
  const logoutFunc = () => {
    auth.signOut()
  }
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar  bg="dark" variant="dark" className="navbar-expand">
          <Navbar.Brand >React Real time chat</Navbar.Brand>
          {
            user
              ? <Button variant="primary" onClick={logoutFunc}>Logout</Button>
              : 0
          }
          
        </Navbar>
      </BrowserRouter>
      {
        user
          ? <Chat/>
          : <Login/>
        
      }
    </div>
  );
}

export default App;
