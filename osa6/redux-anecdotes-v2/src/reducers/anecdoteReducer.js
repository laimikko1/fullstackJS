import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'VOTE':
      const old = state.filter(a => a.id !== action.id)
      const voted = state.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export const anecdoteInitilization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes
    })
  }
}

export const anecdoteCreation = (data) => {
  return async (dispatch) => {
    const newA = await anecdoteService.addNew(data)
    dispatch({
      type: 'CREATE',
      data: newA
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const newA = await anecdoteService.putOne(anecdote)
    dispatch({
      type: 'VOTE',
      id: newA.id
    })
  }

}

export default anecdoteReducer