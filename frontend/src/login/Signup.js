import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { sendUsers,setExpeditor } from '../redux/actions'
import Login from './Login'
import Connect from '../connect/Connect'


export default function Signup() {
    const [connect,setConnect] = useState(false)
    const { users } = useSelector((state) => state.userReducer)
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
                dispatch(setExpeditor(res.data[res.data.length-1]))
                setConnect(true)
            })
            .catch(() => console.log('Chargement des users echoue'))
    }

    if (!connect) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input type={'text'} onChange={(e) => setNewUsername(e.target.value)} />
                <input type={'password'} onChange={(e) => setNewPassword1(e.target.value)} />
                <input type={'password'} onChange={(e) => setNewPassword2(e.target.value)} />
                <input type={'text'} onChange={(e) => setImage(e.target.value)} />
                <button
                    onClick={() => {
                        const myUser = users.filter((element) => {
                            return element.username === newUsername
                        })
                        if (myUser.length === 0) {
                            if (newPassword1 === newPassword2) {
                                axios.post("http://localhost:4000/user", {
                                    "username": newUsername,
                                    "password": newPassword1,
                                    "image": image
                                });
                                setTimeout(loadUsers, 1000)
                            } else console.log("Les 2 passwords ne sont pas identiques..")
                        } else console.log("Username deja utilisé..")
                    }}
                >Creer</button>
            </div>
        )
    } else return <Connect />
}
