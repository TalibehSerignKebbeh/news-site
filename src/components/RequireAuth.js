import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import UseAuth from '../features/Auth/UseAuth';
const RequireAuth = ({ allowedRoles }) => {
    const { user } = UseAuth()
    console.log(user);
    return (!user ? Navigate({ to: "/login", replace: true }) :
        allowedRoles?.includes(user?.role) ? <Outlet /> :
            Navigate({ to: "/unauthorized", replace: true })
      );
}

export default RequireAuth;
