import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, } from 'react-redux'
import { setExpeditor,sendUsers,sendMessages} from '../redux/actions'
import Signup from './Signup'
import Connect from '../connect/Connect'


export default function Login() {
  // const { users,messages,expeditor,destinator} = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [signup, setSignup] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post("http://localhost:4000/login", {
      username,
      password
    });
    if (data.status === false) {
      console.log("Username Or Password Invalid");
    } else {
      axios.get("http://localhost:4000/users", {headers: {Authorization: "Bearer " + (data.token),}})
        .then((res) => {dispatch(sendUsers(res.data));dispatch(setExpeditor(res.data.filter(element=>element._id===data.userId)[0])) })
        .catch(() => console.log('Chargement des users echoue'))
      axios.get("http://localhost:4000/messages", {headers: {Authorization: "Bearer " + (data.token),}})
        .then((res) => {dispatch(sendMessages(res.data)); })
        .catch(() => console.log('Chargement des messages echoue'))  

      localStorage.setItem("expeditor", data.userId);
      localStorage.setItem("token",data.token);
    }
  };


  if (!localStorage.getItem("expeditor")) {
    if (!signup) {
      return (
        <div className='login'>
          <div>
          <img src={require('../logo-chat.png')} alt='' />
            <h3>Very simple application for connecting friends</h3>
          </div>
          <div>
            <h1>Welcome</h1>
            <input type={'text'} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
            <input type={'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button
              onClick={handleSubmit}
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
    axios.get("http://localhost:4000/users", {headers: {Authorization: "Bearer " + (localStorage.getItem("token")),}})
      .then((res) => {dispatch(sendUsers(res.data));dispatch(setExpeditor(res.data.filter(element=>element._id===localStorage.getItem("expeditor"))[0])) })
      .catch(() => console.log('Chargement des users echoue'))
    axios.get("http://localhost:4000/messages", {headers: {Authorization: "Bearer " + localStorage.getItem("token"),}})
      .then((res) => {dispatch(sendMessages(res.data)); })
      .catch(() => console.log('Chargement des messages echoue'))  
    return <Connect />
  }
}