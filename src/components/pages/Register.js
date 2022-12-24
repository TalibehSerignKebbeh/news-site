import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api_url } from '../../app/index';
import Button from '../Button'


const Register = ({ setActiveNavLink }) => {
    // const emailRegex = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i";
    const firstNameRef = useRef()
    const [registerLoading, setregisterLoading] = useState(false);
    const [imgSrc, setimgSrc] = useState(null);
    const [registerSuccessMsg, setregisterSuccessMsg] = useState('');
    const [UserData, setUserData] = useState({
        firstName: "", middleName: "", lastName: "", email: "", username: "",
        password: "", confirmPassword: "", role: "user", profile: null,
    });
    const [errors, seterrors] = useState({
        firstName: "", middleName: "", lastName: "", email: "", username: "",
        password: "", confirmPassword: "", profile: null,
    });
    const [inputTouch, setInputTouch] = useState({
        firstName: false, middleName: false, lastName: false, email: false, username: false,
        password: false, confirmPassword: false, profile: false,
    });
    useEffect(() => {
        firstNameRef.current.focus()
        setActiveNavLink("register")
    }, [])
    useEffect(() => {
        if (inputTouch.firstName) {
            seterrors({ ...errors, firstName: UserData.firstName.length ? "" : "firstname is required" })
        }
    }, [UserData.firstName, errors, inputTouch.firstName])
    useEffect(() => {
        if (inputTouch.lastName) {
            seterrors({ ...errors, lastName: UserData.lastName.length ? "" : "lastname is required" })
        }
    }, [UserData.lastName, errors, inputTouch.lastName])
    useEffect(() => {
        if (inputTouch.email) {
            seterrors({ ...errors, email: !UserData.email.length ? "email required" : "" })
        }
    }, [UserData.email, errors, inputTouch.email])
    useEffect(() => {
        if (inputTouch.username) {
            seterrors({ ...errors, username: UserData.username.length ? "" : "username required" })
        }
    }, [UserData.username, errors, inputTouch.username])
    useEffect(() => {
        if (inputTouch.password) {
            seterrors({ ...errors, password: !UserData.password.length ? "password required" : UserData.password.length < 5 ? "password should more than 4 characters" : "" })
        }
    }, [UserData.password, errors, inputTouch.password])
    useEffect(() => {
        if (inputTouch.confirmPassword) {
            seterrors({ ...errors, confirmPassword: !UserData.confirmPassword.length ? "comfirm password required" : UserData.confirmPassword !== UserData.password ? "confirm password must be equal to password" : "" })
        }
    }, [UserData.confirmPassword, UserData.password, errors, inputTouch.confirmPassword])
    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...UserData, profile: file })
        const fileReader = new FileReader();
        fileReader.onload = x => {
            setimgSrc(x.target.result)
            console.log(x.target.result);
        }
        fileReader.readAsDataURL(file)
    }
    const handleSubmit = async (e) => {
        console.log("submit ");
        e.preventDefault()
        if (errors.firstName.length>0 || errors.lastName.length>0 || errors.username.length>0 || errors.username.length>0 || errors.email.length>0 || errors.password.length>0 || errors.confirmPassword.length>0 || errors.profile !== null) {
            return;
        }
        console.log("error validation done");
        const formdata = new FormData()
        formdata.append("firstName",UserData.firstName)
        formdata.append("middleName",UserData.middleName)
        formdata.append("lastName",UserData.lastName)
        formdata.append("username",UserData.username)
        formdata.append("email",UserData.email)
        formdata.append("password",UserData.password)
        formdata.append("confirmPassword",UserData.confirmPassword)
        formdata.append("profile", UserData.profile)
        formdata.append("role", UserData.role)
        setregisterLoading(true)
        await axios.post(api_url + "/users", formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                setregisterLoading(false)
                setregisterSuccessMsg(res?.data?.message)
                console.log(res);
            }).catch(err => {
                setregisterLoading(false)
                console.log(err);
            })

    }
  
    return (
        <div className='w-full h-auto overflow-x-hidden'>
            <form onSubmit={handleSubmit}
                className='md:w-1/2 m-auto gap-y-3 w-full h-auto flex 
            flex-wrap flex-row items-center justify-center shadow-2xl rounded-2xl'>
                <h3 className='w-full text-start mx-12 text-2xl mb-2 mt-auto text-gray-900'>Register</h3>
                {registerSuccessMsg? <h3 className='w-full text-start mx-12 text-2xl mb-2 mt-auto text-green-900'>{ registerSuccessMsg}</h3> : null}
                <div className=' w-10/12 m-auto mb-2 '>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                       ref={firstNameRef} placeholder='FirstName' onBlur={() => setInputTouch({ ...inputTouch, firstName: true })}
                        type={'text'} value={UserData?.firstName} onChange={(e) => setUserData({ ...UserData, firstName: e.target.value })} />
                    {errors.firstName.length ? <p className=' text-red-400 text-sm font-body'>{errors?.firstName}</p> : null}
                </div>
                <div className=' w-10/12 m-auto mb-2'>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='MiddleName'
                        type={'text'} value={UserData?.middleName} onChange={(e) => setUserData({ ...UserData, middleName: e.target.value })} />
                </div>
                <div className=' w-10/12 m-auto mb-2'>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='LastName' onBlur={() => setInputTouch({ ...inputTouch, lastName: true })}
                        type={'text'} value={UserData?.lastName} onChange={(e) => setUserData({ ...UserData, lastName: e.target.value })} />
                    {errors.lastName.length ? <p className=' text-red-400 text-sm font-body'>{errors?.lastName}</p> : null}
                </div>
                <div className=' w-10/12 m-auto mb-2'>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='Username' onBlur={() => setInputTouch({ ...inputTouch, username: true })}
                        type={'text'} value={UserData?.username} onChange={(e) => setUserData({ ...UserData, username: e.target.value })} />
                    {errors.username.length ? <p className=' text-red-400 text-sm font-body'>{errors?.username}</p> : null}
                </div>
                <div className=' w-10/12 m-auto mb-2'>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='Password' onBlur={() => setInputTouch({ ...inputTouch, password: true })}
                        type={'password'} value={UserData?.password} onChange={(e) => setUserData({ ...UserData, password: e.target.value })} />
                    {errors.password.length ? <p className=' text-red-400 text-sm font-body'>{errors?.password}</p> : null}
                </div>
                <div className=' w-10/12 m-auto mb-2'>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='Confirm Password' onBlur={() => setInputTouch({ ...inputTouch, confirmPassword: true })}
                        type={'password'} value={UserData?.confirmPassword} onChange={(e) => setUserData({ ...UserData, confirmPassword: e.target.value })} />
                    {errors.confirmPassword.length ? <p className=' text-red-400 text-sm font-body'>{errors?.confirmPassword}</p> : null}
                </div>
                <div className=' w-10/12 m-auto mb-2'>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='Email' onBlur={() => setInputTouch({ ...inputTouch, email: true })}
                        type={'email'} value={UserData?.email} onChange={(e) => setUserData({ ...UserData, email: e.target.value })} />
                    {errors.email.length ? <p className=' text-red-400 text-sm font-body'>{errors?.email}</p> : null}
                </div>
                <div className=' w-10/12 m-auto mb-2 mx-1'>
                    <label htmlFor='profile'
                        className='w-36 h-14 bg-gray-400 text-center pt-4 pb-3 rounded-xl text-lg'
                    >
                        Upload Profile
                        <input className='w-96 h-10 rounded-xl text-gray-700'
                            type={'file'} onChange={handleProfileChange} onBlur={() => setInputTouch({ ...inputTouch, profile: true })}
                            hidden id='profile'
                        />
                    </label>
                </div>
                <div className=' w-full text-start md:px-5  mx-8 my-2  '>
                    <p className='text-sm '>Already have an account <Link to={'/login'} className="underline " >Login</Link></p> 
                </div>
                <div className='md:w-80 w-10/12 mx-1 h-auto md:ml-11 md:mr-auto text-xs '>
                    <Button text={registerLoading? "sending data ...": "Register"}  />
                </div>

            </form>

        </div>
    );
}

export default Register;
