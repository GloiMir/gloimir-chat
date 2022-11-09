import './App.css';
// import socketClient from 'socket.io-client'
import axios from 'axios'
import {useEffect,useState} from 'react'
import {Provider, useSelector,useDispatch} from 'react-redux'
import {sendUsers,sendMessages,setDiscussion,setDestinator,addMessage} from './redux/actions'

function App() {
  const [showChat,setShowChat] = useState(false)
  const [myMessage,setMyMessage] = useState("")
  const dispatch = useDispatch()
  axios.get("http://localhost:4000/users")
    .then((res)=>{ dispatch(sendUsers(res.data))})
    .catch(()=>console.log('Chargement des users echoue'))
  axios.get("http://localhost:4000/messages")
    .then((res)=>{ dispatch(sendMessages(res.data))})
    .catch(()=>console.log('Chargement des messages echoue'))

  const { users, messages, expeditor, destinator, discussion } = useSelector((state) => state.userReducer)
  
  return (
      <div style={{display:'flex',flexDirection:'row'}}>
        <div>
          <ul>
            {
              users.map((item,index)=>{
                return(
                  <li onClick={()=>{
                    dispatch(setDestinator(item))
                    const myDiscussion = messages.filter((element)=>{
                      return (element.from === "63682b5ff27b266c3b3c4d2b" && element.to === destinator._id) || (element.to === "63682b5ff27b266c3b3c4d2b" && element.from === destinator._id)
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
          showChat && <div style={{display:'flex',flexDirection:'column'}}>
            {
              discussion.map((item,index)=>(
                <small key={index}>{item.content}</small>
              ))
            }
            <input type={'text'} onChange={(e)=>setMyMessage(e.target.value)} />
            <button onClick={
              ()=>{
                axios.post("http://localhost:4000/message",{
                  "date":new Date(),
                  "from":"63682b5ff27b266c3b3c4d2b",
                  "to":destinator._id,
                  "content":myMessage
                });
                dispatch(addMessage(
                  {
                    "date":new Date(),
                    "from":"63682b5ff27b266c3b3c4d2b",
                    "to":destinator._id,
                    "content":myMessage
                  }
                ));
                setMyMessage("")
              }
            }>Envoyer</button>
          </div>
        }
      </div>
  );
}

export default App;
