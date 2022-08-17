import React from 'react';
import { useSelector } from 'react-redux';
import LoadingRedirect from './LoadingRedirect';

const PrivateRoute = ({children}) => {
    const {user} = useSelector((state) => ({...state.auth}));
  return user ? children : <LoadingRedirect />
};

export default PrivateRoute;