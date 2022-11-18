import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setDestinator, setDiscussion, addMessage, addUser } from '../redux/actions'
import socketClient from 'socket.io-client'

export default function Connect() {
    const myInput = useRef(null)
    const [myMessage, setMyMessage] = useState("")
    const [io, setIo] = useState(socketClient("http://localhost:4000"))
    const dispatch = useDispatch()
    const { users, messages, expeditor, destinator, discussion } = useSelector((state) => state.userReducer)
    useEffect(() => {
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
    }, [dispatch, expeditor, io, destinator._id])
    return (
        <div className='connect'>
            <div>
                {
                    users.map((item, index) => {
                        return (
                            <button key={index} onClick={() => {
                                dispatch(setDestinator(item))
                                const myDiscussion = messages.filter((element) => {
                                    return (element.from === expeditor._id && element.to === destinator._id) || (element.to === expeditor._id && element.from === destinator._id)
                                })
                                dispatch(setDiscussion(myDiscussion))
                                // setShowChat(true)
                            }}>
                                {/* <> */}
                                <img src={item.image} alt='' width='30vw' />
                                {item.username}
                                {/* </> */}
                            </button>
                        )
                    })
                }
            </div>
            <div>
                <div>
                    <div>
                        <img src={expeditor.image} alt='' width='50vw' height='100%' />
                        <span>{expeditor.username}</span>
                    </div>
                    <img src={require('../communication2.jpg')} alt='' />
                    <div>
                        <img src={destinator.image} alt='' width='50vw' height='100%' />
                        <span>{destinator.username}</span>
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
                                            {/* <span>{item.date}</span> */}
                                        </div>
                                    </div>
                                else
                                    return <div key={index} className='destinataire'>
                                        <div>
                                            <small key={index}>{item.content}</small>
                                            {/* <small>{item.date}</small> */}
                                        </div>
                                    </div>
                            })
                        }
                    </div>
                    <div>
                        <input ref={myInput} value={myMessage} type={'text'} placeholder='Entre votre message' multiple onChange={(e) => setMyMessage(e.target.value)} />
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
                        }>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
