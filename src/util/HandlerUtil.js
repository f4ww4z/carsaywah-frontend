import axios from 'axios'
import { BASE_URL } from '../constants/ServerConstants'
import { isAuthenticated } from '../_handlers/AuthHandler'
import { getSession } from './SessionUtil'

export const ai = () => axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 10,
  headers: isAuthenticated() ? { 'Authorization': `Bearer ${getSession().access}` } : {},
})

export const sendRequest = async ({ method = 'get', endpoint, data = {} }) => {
  // console.log('sending request with data:')
  // console.log(data)
  try {
    const result = await axios({
      method: method,
      url: `${BASE_URL}/${endpoint}/`,
      timeout: 1000 * 60 * 10,
      headers: isAuthenticated() ? { 'Authorization': `Bearer ${getSession().access}` } : {},
      data: data,
    })

    return result.data
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}
