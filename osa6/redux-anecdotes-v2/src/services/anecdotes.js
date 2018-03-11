import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const addNew = async (content) => {
    const response = await axios.post(url, { content, votes: 0 })
    return response.data
}

const putOne = async (anecdote) => {
    const id = anecdote.id
    const newA = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await axios.put(`${url}/${id}`, newA)
    return response.data
}

export default { getAll, addNew, putOne }