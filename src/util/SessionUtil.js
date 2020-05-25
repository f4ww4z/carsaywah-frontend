const SS_ACCESS_TOKEN = 'token'
const SS_REFRESH_TOKEN = 'refresh_token'
const SS_USERNAME = 'username'
const SS_USER_ID = 'user_id'

export const getSession = () => {
  return {
    access: sessionStorage.getItem(SS_ACCESS_TOKEN),
    refresh: sessionStorage.getItem(SS_REFRESH_TOKEN),
    username: sessionStorage.getItem(SS_USERNAME),
    userId: Number(sessionStorage.getItem(SS_USER_ID))
  }
}

export const setSession = ({ access, refresh, username, userId }) => {
  if (access)
    sessionStorage.setItem(SS_ACCESS_TOKEN, access)

  if (refresh)
    sessionStorage.setItem(SS_REFRESH_TOKEN, refresh)

  if (username)
    sessionStorage.setItem(SS_USERNAME, username)

  if (userId)
    sessionStorage.setItem(SS_USER_ID, userId)
}