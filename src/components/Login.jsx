import React, {useContext} from 'react'
import { Button } from 'react-bootstrap'
import {Context} from '../index'
import '../css/Login.css'
import firebase from "firebase";

function Login() {

  const {auth} =  useContext(Context)
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
    console.log(user)
}
  return (
    <div className="login__block">
      <div className="login__block-inner">
        <p className="login-title">Войти в чат</p>
        <Button onClick={login} variant="success">Войти с помощью Google</Button>
      </div>
    </div>
  )
}

export default Login
