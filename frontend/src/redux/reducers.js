import { SEND_USERS,SEND_MESSAGES,SET_EXPEDITOR,SET_DESTINATOR,SET_DISCUSSION, ADD_MESSAGE } from './actions'

let initialState = {
    users: [],
    messages : [],
    expeditor : [],
    destinator:[],
    discussion: []
}

function userReducer(state = initialState, action) {
    const { users, messages, expeditor, destinator, discussion} = state
    switch (action.type) {
        case SEND_USERS:
            return {...state, users: action.payload}
        case SEND_MESSAGES:
            return {...state, messages: action.payload}
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