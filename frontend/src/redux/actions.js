export const SET_EXPEDITOR = "SET_EXPEDITOR"
export const SET_DESTINATOR = "SET_DESTINATOR"
export const SET_DISCUSSION = "SET_DISCUSSION"
export const ADD_MESSAGE = "ADD_MESSAGE"

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