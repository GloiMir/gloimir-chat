import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setDestinator, setDiscussion, addMessage, addUser } from '../redux/actions'
import socketClient from 'socket.io-client'

export default function Connect() {
    const [showChat, setShowChat] = useState(false)
    const [myMessage, setMyMessage] = useState("")
    const [io,setIo] = useState(socketClient("http://localhost:4000"))
    const dispatch = useDispatch()
    const { users, messages, expeditor, destinator, discussion } = useSelector((state) => state.userReducer)
    useEffect(()=>{
        // const io = socketClient("http://localhost:4000")
        io.on('newMessage',(data)=>{
            if(data.to===expeditor._id){
                dispatch(addMessage(data))
                console.log('Nous avons reçu un message depuis un autre utilisateur')
                return
            }
        })
        io.on('newUser',(data)=>{
            dispatch(addUser(data))
        })
    },[dispatch,expeditor,io])
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <ul>
                    {
                        users.map((item, index) => {
                            return (
                                <li onClick={() => {
                                    dispatch(setDestinator(item))
                                    const myDiscussion = messages.filter((element) => {
                                        return (element.from === expeditor._id && element.to === destinator._id) || (element.to === expeditor._id && element.from === destinator._id)
                                    })
                                    dispatch(setDiscussion(myDiscussion))
                                    setShowChat(true)
                                }} key={index}>{item.username}</li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                showChat && <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        discussion.map((item, index) => (
                            <small key={index}>{item.content}</small>
                        ))
                    }
                    <input type={'text'} onChange={(e) => setMyMessage(e.target.value)} />
                    <button onClick={
                        () => {
                            axios.post("http://localhost:4000/message", {
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
                    }>Envoyer</button>
                </div>
            }
        </div>
    )
}
