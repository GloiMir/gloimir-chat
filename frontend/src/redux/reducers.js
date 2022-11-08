import { SET_EXPEDITOR,SET_DESTINATOR,SET_DISCUSSION, ADD_MESSAGE } from './actions'
import axios from 'axios'

let initialState = {
    users: [],
    messages : [],
    expeditor : [],
    destinator:[],
    discussion: []
}

axios.get("http://localhost:4000/sendUsers")
    .then((res)=>{initialState.users=res.data})
    .catch(()=>console.log('Chargement des users echoue'))

axios.get("http://localhost:4000/sendMessages")
    .then((res)=>{initialState.messages=res.data})
    .catch(()=>console.log('Chargement des messages echoue'))

function userReducer(state = initialState, action) {
    const { users, messages, expeditor, destinator, discussion} = state
    switch (action.type) {
        case SET_EXPEDITOR:
            return { ...state, expeditor: action.payload }
        case SET_DESTINATOR:
            return { ...state, destinator: action.payload }
        case SET_DISCUSSION:
            return { ...state, discussion: action.payload }
        case ADD_MESSAGE:
            discussion.push(action.payload)
            messages.push(action.payload)
            return { users, messages, expeditor, destinator, discussion }
        default:
            return state
    }
}

export default userReducer