import axios from 'axios'
import { BASE_URL } from '../constants/ServerConstants'
import { currentTimestamp } from '../util/DateUtil'
import JwtDecode from 'jwt-decode'
import { getSession, setSession } from '../util/SessionUtil'

export const getUserTokenAndUserId = async (username, password) => {
  try {
    let result = await axios.post(
      `${BASE_URL}/token/`,
      {
        'username': username,
        'password': password,
      },
    )

    /*
    * result.data = {
    *   access: '',
    *   refresh: ''
    * }
    */
    const decodedAccessToken = JwtDecode(result.data['access'])

    return {
      ...result.data,
      userId: decodedAccessToken['user_id']
    }

  } catch (error) {
    console.log(error.response)
    return ''
  }
}

export const registerUser = async (username, email, password) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/users/register/`,
      {
        'username': username,
        'email': email,
        'password': password,
      })

    console.log(result)

    if (result.status !== 201) {
      return {}
    }

    // return id, username, email, password
    return result.data

  } catch (e) {
    console.log(e.response)
    return {}
  }
}

export const isAuthenticated = () => {
  // console.log('Checking if authenticated or not...')

  const currentSession = getSession()

  // if any of the currentSession object value is null, return false
  for (let value of Object.values(currentSession)) {
    // console.log(value)
    if (value === null || value.length === 0) {
      return false
    }
  }

  const decodedAccessToken = JwtDecode(currentSession.access)
  // console.log(decodedAccessToken)

  const expiry = decodedAccessToken.exp
  // console.log(expiry + " vs " + currentTimestamp());
  if (expiry < currentTimestamp()) {
    return false
  }

  // console.log(decodedAccessToken['user_id'])
  // console.log(currentSession.userId)

  return Number(decodedAccessToken['user_id']) === currentSession.userId
}

export const refreshToken = async () => {
  const session = getSession()

  try {
    const result = await axios.post(
      `${BASE_URL}/token/refresh/`,
      {
        'refresh': String(session.refresh),
      })

    setSession({ access: result.data['access'] })
    // console.log(result.data['access'])

  } catch (error) {
    console.log(error.response)
  }
}