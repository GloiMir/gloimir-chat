import './App.css';
import socketClient from 'socket.io-client'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {sendUsers,sendMessages} from './redux/actions'
import Login from './login/Login';

function App() {
  const dispatch = useDispatch()
  axios.get("http://localhost:4000/users")
    .then((res)=>{ dispatch(sendUsers(res.data))})
    .catch(()=>console.log('Chargement des users echoue'))
  axios.get("http://localhost:4000/messages")
    .then((res)=>{ dispatch(sendMessages(res.data))})
    .catch(()=>console.log('Chargement des messages echoue'))
  return (
    <Login />
  );
}

export default App;
