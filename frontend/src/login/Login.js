import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setExpeditor,setDestinator } from '../redux/actions'
import Signup from './Signup'
import Connect from '../connect/Connect'

export default function Login() {
  const { users} = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [connect, setConenct] = useState(false)
  const [signup, setSignup] = useState(false)

  if (!connect) {
    if (!signup) {
      return (
        <div className='login'>
          <div>
          <img src={require('../logo-chat.png')} alt='' />
            <h3>Very simple application for connecting friends</h3>
          </div>
          <div>
            <h1>Login</h1>
            <input type={'text'} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
            <input type={'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button
              onClick={() => {
                const myUser = users.filter((element) => {
                  return element.username === username && element.password === password
                })
                if (myUser.length !== 0) {
                  dispatch(setExpeditor(myUser[0]))
                  dispatch(setDestinator(myUser[0]))
                  setConenct(true)
                } else console.log("Utilisateur invalide..")
              }}
            >Se connecter</button>
            <small>Ou</small>
            <button onClick={() => setSignup(true)}>Créer un compte</button>
          </div>
        </div>
      )
    } else {
      return <Signup />
    }

  } else {
    return <Connect />
  }
}
