import React, { useContext, usestate } from 'react'
import Admin from './Admin'
import User from './User'
import Guest from './Guest'
import { GlobalContext } from './usercontext/context'
import { decodeToken } from 'react-jwt'

const UserRole = {
  "admin": Admin,
  "guest": Guest,
  "user": User
}
 export const AppRoute = '/'


const UserByRole = (params) => UserRole[params] || UserRole['guest']


export default function App() {

  const { state, dispatch } = useContext(GlobalContext)

  const getDecodeToken = (token) => {
    if (!token) {
      return undefined
    } else {
      const res = decodeToken(token)
      return res?.role
    }

  }

  const currentToken = getDecodeToken(state.token)
  const CurrentUser = UserByRole(currentToken)
  return <CurrentUser />
}