import React from 'react'
import { Redirect, Route } from 'react-router'
import { isAuthenticated, refreshToken } from '../_handlers/AuthHandler'

// export const ProtectedRoute = ({ children: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isAuthenticated() ?
//       <Component {...props} />
//       :
//       <Redirect to={{ pathname: '/login' }}/>
//   )}/>
// )

export const ProtectedRoute = ({ children, exact, path, ...rest }) => {
  const auth = isAuthenticated()
  if (auth) {
    refreshToken()
  }

  return (
    auth ?
      <Route exact={exact} path={path} {...rest}>
        {children}
      </Route>
      :
      <Redirect to={{ pathname: '/login' }}/>
  )
}
