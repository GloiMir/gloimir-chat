import './App.css';
// import socketClient from 'socket.io-client'
import {useEffect,useState} from 'react'
import {Provider, useSelector} from 'react-redux'

import axios from 'axios'

function App() {
  const { users, messages, expeditor, destinator, discussion } = useSelector((state) => state.userReducer)
  // const [users,setUsers] = useState([])
  // const [discussion,setDiscussion] = useState([])
  console.log(users)
  // function receiveData(){
  //   axios.get("http://localhost:4000/sendUsers")
  //   .then((res)=>{setUsers(res.data);})
  //   .catch((error)=>console.log(error))
  // }
  // receiveData()
  // useEffect(
  //   ()=>{
  //     axios.get("http://localhost:4000/sendUsers")
  //     .then((res)=>{setUsers(res.data);console.log(users)})
  //     .catch((error)=>console.log(error))
  //   },[users]
  // )
  // axios.get("http://localhost:4000/sendUsers")
  //   .then((res)=>{users=res.data;console.log(users)})
  //   .catch((error)=>console.log(error))
  // const { users,messages,expeditor,destinator,discussion } = useSelector((state) => state.userReducer)
  // useEffect(()=>{
  //   const socket = socketClient("http://localhost:4000")
  //   socket.on('fromApi',(data)=>{
  //     // setResponse(data)
  //     console.log(data)
  //     // console.log('Nous recevons quelque chose de notre serveur')
  //   })
  // },[])
  
  return (
      <div>
        <ul>
          {
            users.map((item,index)=>{
              return(
                <li onClick={()=>{
                  // axios.get("http://localhost:4000/sendDiscussion")
                  // .then((res)=>{setDiscussion(res.data);console.log(discussion)})
                  // .catch((error)=>console.log(error))
                }} key={index}>{item.username}</li>
              )
            })
          }
        </ul>
      </div>
  );
}

export default App;
