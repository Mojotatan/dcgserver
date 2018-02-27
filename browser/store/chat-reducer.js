// initial state
const initialState = {
  chatLog: [],
  channel: null
}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case NEW_CHAT:
      newState.chatLog = [...prevState.chatLog, action.chat]
      return newState
    case SET_CHANNEL:
      newState.channel = action.channel
      return newState
    default:
      return newState
  }
}

// constants and action creators
const NEW_CHAT = 'NEW_CHAT'
export const newChat = chat => {
  return {type: NEW_CHAT, chat}
}

const SET_CHANNEL = 'SET_CHANNEL'
export const setChannel = channel => {
  return {type: SET_CHANNEL, channel}
}

// thunks

export default reducer