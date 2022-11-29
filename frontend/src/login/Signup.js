import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { sendUsers, setExpeditor, setDestinator, setDiscussion } from '../redux/actions'
import Login from './Login'
import Connect from '../connect/Connect'

const aleatoire = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export default function Signup() {
    const [connect, setConnect] = useState(false)
    const [login, setLogin] = useState(false)
    const { users,messages,expeditor,destinator } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [newUsername, setNewUsername] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [image, setImage] = useState("")

    const loadUsers = () => {
        axios.get("http://localhost:4000/users")
            .then((res) => {
                console.log("Nous venons de créer un nouvel utilisateur")
                dispatch(sendUsers(res.data))
                dispatch(setExpeditor(res.data[res.data.length - 1]))
                dispatch(setDestinator(users[aleatoire(0,res.data.length - 1)]))
                  dispatch(
                    setDiscussion(
                      messages.filter(
                        (element)=>(element.from === expeditor._id && element.to === destinator._id) || (element.to === expeditor._id && element.from === destinator._id)
                      )
                    )
                  )
                setConnect(true)
            })
            .catch(() => console.log('Chargement des users echoue'))
    }
    const validationImg = (e) => {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert('max file size 1mb, fichier trop grand')
        }
        else {
            setImage(file);
        }
    }
    const uploadImg = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'fr0nicac');
        try {
            let res = await fetch('https://api.cloudinary.com/v1_1/dko2ggyav/image/upload', {
                method: 'post',
                body: data
            })
            const urlData = await res.json();
            return urlData.url
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
          const { data } = await axios.post("http://localhost:4000/register", {
            "username":newUsername,
            "password":newPassword1,
            "image":await uploadImg()
          });
          if (data.status === false) {
            console.log("Error");
          } else {
            console.log("Success");
            setLogin(true)
          }
      };

    if (!connect) {
        if (!login) {
            return (
                <div className='signup'>
                    <div>
                        <img src={require('../logo-chat.png')} alt='' />
                        <h3>Very simple application for connecting friends</h3>
                    </div>
                    <div>
                        <h1>Welcome</h1>
                        <input type={'text'} placeholder='Username' onChange={(e) => setNewUsername(e.target.value)} />
                        <input type={'password'} placeholder='Password' onChange={(e) => setNewPassword1(e.target.value)} />
                        <input type={'password'} placeholder='Confirm password' onChange={(e) => setNewPassword2(e.target.value)} />
                        <button><input type={'file'} placeholder='image' onChange={validationImg} /></button>
                        <button
                            onClick={handleSubmit}
                        >Creer</button>
                        <small>Ou</small>
                        <button onClick={() => setLogin(true)}>Se connecter</button>
                    </div>
                </div>
            )
        } else return <Login />

    } else return <Connect />
}