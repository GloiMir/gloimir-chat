export const SEND_USERS =  "SEND_USERS"
export const SEND_MESSAGES = "SEND_MESSAGES"
export const SET_EXPEDITOR = "SET_EXPEDITOR"
export const SET_DESTINATOR = "SET_DESTINATOR"
export const SET_DISCUSSION = "SET_DISCUSSION"
export const ADD_MESSAGE = "ADD_MESSAGE"
export const ADD_USER = "ADD_USER"

export const sendMessages = messages=>dispatch=>{
    dispatch(
        {
            type:SEND_MESSAGES,
            payload:messages
        }
    )
}

export const sendUsers = users=>dispatch=>{
    dispatch(
        {
            type:SEND_USERS,
            payload:users
        }
    )
}

export const setExpeditor = user=>dispatch=>{
    dispatch(
        {
            type:SET_EXPEDITOR,
            payload:user
        }
    )
}

export const setDestinator = user=>dispatch=>{
    dispatch(
        {
            type:SET_DESTINATOR,
            payload:user
        }
    )
}

export const setDiscussion = discussion=>dispatch=>{
    dispatch(
        {
            type:SET_DISCUSSION,
            payload:discussion
        }
    )
}

export const addMessage = message=>dispatch=>{
    dispatch(
        {
            type:ADD_MESSAGE,
            payload:message
        }
    )
}

export const addUser = user=>dispatch=>{
    dispatch(
        {
            type:ADD_USER,
            payload:user
        }
    )
}