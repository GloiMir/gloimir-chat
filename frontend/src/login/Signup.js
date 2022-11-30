import React, { useState } from 'react'
import axios from 'axios'
import Login from './Login'

export default function Signup() {
    const [login, setLogin] = useState(false)
    const [newUsername, setNewUsername] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [image, setImage] = useState("")

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
        const { data } = await axios.post("https://chat-3670.onrender.com/register", {
            "username": newUsername,
            "password": newPassword1,
            "image": await uploadImg()
        });
        if (data.status === false) {
            console.log("Error");
        } else {
            console.log("Success");
            setLogin(true)
        }
    };

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
                    <input type={'password'} placeholder='Password' onChange={(e) => setNewPassword1(e.target.value)} value={newPassword1} />
                    <input type={'password'} placeholder='Confirm password' onChange={(e) => setNewPassword2(e.target.value)} value={newPassword2} />
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
}