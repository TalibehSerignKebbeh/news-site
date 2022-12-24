import React, { useEffect, useState, useRef } from 'react';
// import { useLoginMutation } from '../features/Auth/AuthApiSlice';
import { setCredentials } from '../../features/Auth/AuthSlice';
import {useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../API';
import {sendLoginMutation} from '../../features/Auth/AuthApiSlice'

const Login = ({ setActiveNavLink}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const usernameRef = useRef()
    // const [login, { isLoading }] = sendLoginMutation()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('');
    const [loginLoading, setloginLoading] = useState(false);
    const [loginSuccess, setloginSuccess] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    const [usernameError, setusernameError] = useState("");
    const [passwordError, setpasswordError] = useState('');
    const [usernameTouch, setusernameTouch] = useState(false);
    const [passwordTouch, setpasswordTouch] = useState(false);
    useEffect(() => {
        usernameRef.current.focus();
    setActiveNavLink("login")
    return () => {};
   }, [setActiveNavLink]);
    useEffect(() => {
            setpasswordError(!password?.length ? 'password is required' : password?.length < 5 ? "password must 4 or more characters long" : '')
    }, [password])
    useEffect(() => {
            setusernameError(!username?.length ? 'username is required' : (username?.length <= 3 && username.split(' ') > 1) ?
                "username must be 4 or more characters without the space character" : username?.length <= 3 ? "username must 4 or more characters" : username?.split(' ') > 1 ? "username cannot contain spaces" : '')
}, [username])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameError?.length || passwordError?.length) {
            setpasswordTouch(true)
            setusernameTouch(true)
            return;
        }
        setloginLoading(true)
        setloginSuccess(false)
        seterrorMsg('')
        await axiosInstance.post("/auth", { username, password })
            .then(res => {
                setloginLoading(false)
                setloginSuccess(true)
                console.log(res?.data)
                dispatch(setCredentials(res?.data))
                setsuccessMsg("Login successfully")
                 navigate("/")
            })
            .catch(err => {
                console.log(err);
                setloginSuccess(false)
                setloginLoading(false)
                const errorCode = err?.message?.slice(-3, err?.message?.length);
                // console.log(err?.message?.slice(-3, err?.message?.length));
                if(Number(errorCode) === 400) seterrorMsg("invalid credentials");
                if(Number(errorCode) === 500) seterrorMsg("internal server credentials");
                
        })
        
    }
   
    return (
        <div className='w-auto overflow-x-hidden h-full '>
            <form onSubmit={handleSubmit}
                className='bg-white border-2 shadow md:w-2/6 w-72 overflow-x-hidden h-auto m-auto rounded md:mt-8 mt-5 mb-auto flex flex-col items-center justify-center '>
                <h1 className='text-lg text-center font-bold w-full md:py-2 '>Login</h1>
                {successMsg? <p className='text-green-500 text-lg font-medium p-1'>{successMsg}</p> : null}
                {errorMsg? <p className='text-red-500 text-lg font-medium px-1'>{errorMsg}</p> : null}
                <div className='md:w-80 w-full m-auto mb-2'>
                    <label className='text-sm font-semibold px-0 -mb-1 py-2' htmlFor='username'>Username</label>
                    <input ref={usernameRef} className={`${(usernameError)? 'border-red-300':'focus:shadow-md'} mx-auto  h-11 px-4  py-2 text-gray-800 rounded-xl`}
                        type={'text'} value={username} id="username" onChange={e=>setusername(e.target.value)} 
                      onClick={()=>setusernameTouch(true)} />
                    {usernameError && usernameTouch? <span className='text-red-500 px-1 font-normal text-start text-sm'>{usernameError}</span> : null}
                </div>
                <div className='md:w-80 w-full m-auto '>
                    <label className='text-sm font-semibold px-0 -mb-1 py-2' htmlFor='password'>Password</label>
                    <input className={`${(passwordError)? 'border-red-300':'focus:shadow-md'} mx-auto  h-11 px-4 py-2 text-gray-800 rounded-xl`}
                        type={'password'} value={password} id="password" onChange={e=>setpassword(e.target.value)} 
                          onClick={()=>setpasswordTouch(true)}
                        />
                    {passwordError && passwordTouch? <span className='text-red-500 px-1 font-normal text-start text-sm'>{passwordError}</span> : null}
                    
                </div>
                <div className='my-2 mt-4 w-full md:px-6'>
                    <p className='text-sm '>If you don't have an account <Link to={'/register'} className="underline " >Register</Link></p> 
                </div>
                <button type='submit' disabled={loginLoading}
                    className='md:text-2xl text-sm md:w-60 w-48 md:h-14 h-10 m-auto mt-4 bg-orange-400 text-white shadow-xl opacity-80 hover:opacity-100 rounded-md'>
                    {loginLoading? "Loading......": 'Submit'}
                </button>
            </form>
            
        </div>
    );
}

export default Login;
