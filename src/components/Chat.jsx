import React, {useContext, useState} from 'react'

import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import {Button,InputGroup,FormControl} from 'react-bootstrap'
import '../css/Chat.css'
import firebase from "firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import classnames from 'classnames'
import Loader from './Loader';


function Chat() {
  const {auth, firestore} = useContext(Context)
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')
  const [messages, loading] = useCollectionData(
      firestore.collection('messages').orderBy('createdAt')
  )
  

  
  const sendMessage = async () => {
    value &&
    firestore.collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setValue('')
  }
  const sendMessageEnter = async (event) => {
    if(event.key === 'Enter') {
      value &&
      firestore.collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      setValue('')
    } 
  }

  if (loading) {
    return <Loader/>
  }
  
  return (
    <div className="chat__block">
      <div className="chat__block-inner">
        <div className="message__block">
          {messages.map(message => 
          
            <div key={message.createdAt} className={classnames('message',{'message__enemy': user.uid !== message.uid})}>
              
              <div className={classnames('message-inner',{'message-inner__enemy': user.uid !== message.uid})}>
                <div id="message-name" style={{fontWeight: 700}} >{message.displayName}</div>
                <div className="message-text" >{message.text}</div>
              </div>
              <img alt="" className={classnames('message-avatar',{'message-avatar__enemy': user.uid !== message.uid})} src={message.photoURL}  />
            </div>
            )}

        </div>
        <InputGroup>
          <FormControl
            placeholder="Введите сообщение"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyPress={sendMessageEnter}
          />
          <InputGroup.Append >
            <Button onClick={sendMessage} variant="success">Отправить</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>

    </div>
  )
}

export default Chat
