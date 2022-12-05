import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setDestinator, setDiscussion, addMessage, addUser } from '../redux/actions'
import socketClient from 'socket.io-client'
import Login from '../login/Login'

export default function Connect() {
    const [login, setLogin] = useState(false)
    const myInput = useRef(null)
    const [myMessage, setMyMessage] = useState("")
    const [io, setIo] = useState(socketClient("https://chat-3670.onrender.com",{transports: ['websocket', 'polling', 'flashsocket']}))
    const dispatch = useDispatch()
    const { users, messages, expeditor, destinator, discussion } = useSelector((state) => state.userReducer)

    io.on('newMessage', (data) => {
        if (data.to === expeditor._id && data.from === destinator._id) {
            dispatch(addMessage(data))
            console.log('Nous avons reçu un message depuis un autre utilisateur')
            return
        }
    })
    io.on('newUser', (data) => {
        dispatch(addUser(data))
    })

    if (!login) {
        return (
            <div className='connect'>
                <div>
                    {
                        users.map((item, index) => {
                            return (
                                <button key={index} onClick={() => {
                                    dispatch(setDestinator(item))
                                    dispatch(setDiscussion(
                                        messages.filter((element) => (element.from === expeditor._id && element.to === destinator._id) || (element.to === expeditor._id && element.from === destinator._id))
                                    ))
                                }}>
                                    <img src={item.image} alt='' width='30vw' />
                                    {item.username}
                                </button>
                            )
                        })
                    }
                </div>
                <div>
                    <div>
                        <div>
                            <img src={destinator.image} alt='' width='50vw' height='100%' />
                            <span>{destinator.username}</span>
                        </div>
                        <img src={require('../communication2.jpg')} alt='' />
                        <div>
                            <img src={expeditor.image} alt='' width='50vw' height='100%' />
                            <img src={require('../logout.png')} onClick={() => { localStorage.clear(); setLogin(true) }} alt='' width='50vw' height='100%' />
                        </div>
                    </div>
                    <div>
                        <div>
                            {
                                discussion.map((item, index) => {
                                    if (item.from === expeditor._id)
                                        return <div key={index} className='expediteur'>
                                            <div>
                                                <small key={index}>{item.content}</small>
                                            </div>
                                        </div>
                                    else
                                        return <div key={index} className='destinataire'>
                                            <div>
                                                <small key={index}>{item.content}</small>
                                            </div>
                                        </div>
                                })
                            }
                        </div>
                        <div>
                            <input ref={myInput} value={myMessage} type={'text'} placeholder='Entrez votre message' multiple onChange={(e) => setMyMessage(e.target.value)} />
                            <button onClick={
                                () => {
                                    axios.post("https://chat-3670.onrender.com/message", {
                                        "date": new Date(),
                                        "from": expeditor._id,
                                        "to": destinator._id,
                                        "content": myMessage
                                    });
                                    dispatch(addMessage(
                                        {
                                            "date": new Date(),
                                            "from": expeditor._id,
                                            "to": destinator._id,
                                            "content": myMessage
                                        }
                                    ));
                                    setMyMessage("")
                                }
                            }>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else return <Login />

}
