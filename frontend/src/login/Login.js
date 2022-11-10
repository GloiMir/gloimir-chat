import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setExpeditor } from '../redux/actions'
import Signup from './Signup'
import Connect from '../connect/Connect'

export default function Login() {
  const { users, expeditor} = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [connect, setConenct] = useState(false)
  const [signup, setSignup] = useState(false)

  if (!connect) {
    if (!signup) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input type={'text'} onChange={(e) => setUsername(e.target.value)} />
          <input type={'password'} onChange={(e) => setPassword(e.target.value)} />
          <button
            onClick={() => {
              const myUser = users.filter((element) => {
                return element.username === username && element.password === password
              })
              if (myUser.length !== 0) {
                dispatch(setExpeditor(myUser[0]))
                console.log(expeditor)
                setConenct(true)
              } else console.log("Utilisateur invalide..")
            }}
          >Se connecter</button>
          <button onClick={() => setSignup(true)}>Créer un compte</button>
        </div>
      )
    } else {
      return <Signup />
    }

  } else {
    return <Connect />
  }
}
