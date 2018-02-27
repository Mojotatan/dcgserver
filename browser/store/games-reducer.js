// initial state
const initialState = {games: []}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_GAMES:
      newState.games = action.games
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_GAMES = 'LOAD_GAMES'
export const loadGames = (games) => {
  return {type: LOAD_GAMES, games}
}

// thunks

export default reducer