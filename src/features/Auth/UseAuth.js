// import React from 'react';
import { myProfileData, myToken } from './AuthSlice';
import { useSelector } from 'react-redux';
const UseAuth = () => {
    const user = useSelector(myProfileData)
    const token = useSelector(myToken)
    if (user) {
        let isAdmin = false;
        let isEditor = false;
        if (user?.role === "admin") isAdmin = true;
        if (user?.role === "editor") isEditor = true;
        return { user, token, isAdmin, isEditor };
    }
    return { user, token }
}

export default UseAuth;
