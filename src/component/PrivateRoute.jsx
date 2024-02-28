import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useToken from './useToken'


const PrivateRoute = () => {
    const { token } = useToken();
    console.log(token)
  
  return token ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute;