// initial state
const initialState = {user: null}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_USER:
      newState.user = action.user
      return newState
    case LOGOUT:
      newState.user = null
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_USER = 'LOAD_USER'
export const loadUser = (user) => {
  return {type: LOAD_USER, user}
}

const LOGOUT = 'LOGOUT'
export const logout = () => {
  return {type: LOGOUT}
}

// thunks

export default reducer