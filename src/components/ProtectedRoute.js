import React from 'react'
import { Redirect, Route } from 'react-router'
import { isAuthenticated } from '../handlers/AuthHandler'

// export const ProtectedRoute = ({ children: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isAuthenticated() ?
//       <Component {...props} />
//       :
//       <Redirect to={{ pathname: '/login' }}/>
//   )}/>
// )

export const ProtectedRoute = ({ children, exact, path, ...rest }) => (
  isAuthenticated() ?
    <Route exact={exact} path={path} {...rest}>
      {children}
    </Route>
    :
    <Redirect to={{ pathname: '/login' }}/>
)