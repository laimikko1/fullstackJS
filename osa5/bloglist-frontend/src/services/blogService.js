import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const put = async (id, newObject) => {
    const config = {
        headers: { 'Authorization': token }
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { 'Authorization': token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response
}


const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const create = async (newObject, user) => {
    const config = {
        headers: { 'Authorization': token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export default { setToken, getAll, create, put, remove }