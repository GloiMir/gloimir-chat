import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setExpeditor,setDestinator,setDiscussion,sendUsers,sendMessages} from '../redux/actions'
import Signup from './Signup'
import Connect from '../connect/Connect'

const aleatoire = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Login() {
  // const { users,messages,expeditor,destinator} = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [connect, setConenct] = useState(false)
  const [signup, setSignup] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { password, username } = values;
    const { data } = await axios.post("http://localhost:4000/login", {
      username,
      password
    });
    if (data.status === false) {
      console.log("Username Or Password Invalid");
    } else {
      // console.log("Bearer " + (data.token))
      // console.log(JSON.stringify(data.token))
      axios.get("http://localhost:4000/users", {headers: {Authorization: "Bearer " + (data.token),}})
        .then((res) => {dispatch(sendUsers(res.data));dispatch(setExpeditor(res.data.filter(element=>element._id===data.userId)[0])) })
        .catch(() => console.log('Chargement des users echoue'))
      axios.get("http://localhost:4000/messages", {headers: {Authorization: "Bearer " + (data.token),}})
        .then((res) => {dispatch(sendMessages(res.data)); })
        .catch(() => console.log('Chargement des messages echoue'))  
      // localStorage.setItem("token", JSON.stringify(data.token));
      // localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("expeditor", data.userId);
      localStorage.setItem("token",data.token);

      // localStorage.setItem("destinator",users[aleatoire(0,users.length-1)])
      // dispatch(setExpeditor(users.filter(element=>element._id===JSON.stringify(data.userId))))
      // // dispatch(setDestinator(users.filter(element=>element._id===localStorage.getItem("destinator"))[0]))
      // dispatch(setDestinator(users[aleatoire(0,users.length-1)]))
      // setConenct(true)
      // console.log(JSON.stringify(data.userId))
    }
  };

  // useEffect(()=>{
  //   if(localStorage.getItem("expeditor")){
  //     dispatch(setExpeditor(users.filter(element=>element._id===localStorage.getItem("expeditor"))[0]))
  //     // dispatch(setDestinator(users.filter(element=>element._id===localStorage.getItem("destinator"))[0]))
  //     setConenct(true)
  //   }
  //   // console.log('Nous voulons nous connecter')
  // })

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
              onClick={handleSubmit
                //   () => {
                //   const taille = users.length-1
                //   const myUser = users.filter((element) => {
                //     return element.username === username && element.password === password
                //   })
                //   if (myUser.length !== 0) {
                //     dispatch(setExpeditor(myUser[0]))
                //     dispatch(setDestinator(users[aleatoire(0,taille)]))
                //     dispatch(
                //       setDiscussion(
                //         messages.filter(
                //           (element)=>(element.from === expeditor._id && element.to === destinator._id) || (element.to === expeditor._id && element.from === destinator._id)
                //         )
                //       )
                //     )
                //     setConenct(true)
                //   } else console.log("Utilisateur invalide..")
                // }
              }
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
    // console.log('Bearer',localStorage.getItem("token"))
    return <Connect />
  }
}