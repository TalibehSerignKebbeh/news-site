import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api_url } from '../../app/index';
import UseAuth from '../../features/Auth/UseAuth';
import Button from '../Button';
const EditUser = ({ setActiveNavLink }) => {
    const { userId } = useParams()
    const { user, token, isAdmin } = UseAuth()
    const [imgSrc, setimgSrc] = useState('');
    const [loading, setloading] = useState(false);
    const [UserData, setUserData] = useState({
        firstName: "", middleName: "", lastName: "", email: "", username: "",
         profile: null,
    });
    const [errors, seterrors] = useState({
        firstName: "", middleName: "", lastName: "", email: "", username: "",
         profile: null,
    });
    const [inputTouch, setInputTouch] = useState({
        firstName: false, middleName: false, lastName: false, email: false, username: false,
        password: false, confirmPassword: false, profile: false,
    });
    useEffect(() => {
        setActiveNavLink("")
        const fetchUser = async () => {
            setloading(true)
            await axios.get(api_url + `/users/${userId}`, {headers: {"authorization": `Bearer ${token}`}})
                .then(res => {
                    setloading(false)
                    setUserData(res.data)
                })
                .catch(err => {
                    setloading(false)
                    console.log(err);
                })
        }
        fetchUser()
    }, [userId])
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
    
    
    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...UserData, profile: file })
        const fileReader = new FileReader();
        fileReader.onload = x => {
            setimgSrc(x.target.result)
        }
        fileReader.readAsDataURL(file)
    }
    return (
        <div className='w-full h-auto overflow-x-hidden'>
            {loading ? <div className='md:w-1/2 w-10/12 text-center'>
                <p className='text-gray-700'>Loading ....</p>
            </div> :
            
            <form onSubmit={() => { }}
                className='md:w-11/12 m-auto gap-y-3 w-full h-auto flex gap-1
            flex-wrap flex-row items-center md:justify-start justify-center shadow-2xl rounded-2xl'>
                    <h3 className='w-11/12 text-start md:ml-14 text-2xl  mt-auto text-gray-900'>Edit User</h3>
                    {UserData?.profile? <div className='w-10/12 m-auto h-40 mb-2 flex flex-row items-end gap-1'>
                        <img src={ api_url + `/${UserData?.profile}`} alt='' 
                            className='w-32 h-32 rounded-md mb-1'
                        />
                         <label htmlFor='profile'
                        className='w-36 h-11 bg-orange-300 text-center pt-3 text-white font-semibold rounded-xl text-sm text-clip'
                    >
                        Change Profile
                        <input className='w-96 h-10 rounded-xl text-gray-700'
                            type={'file'} onChange={handleProfileChange} onBlur={() => setInputTouch({ ...inputTouch, profile: true })}
                            hidden id='profile'
                        />
                    </label>
                    </div> : null}
                <div className=' md:w-2/5 w-10/12 m-auto  '>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='FirstName' onBlur={() => setInputTouch({ ...inputTouch, firstName: true })}
                        type={'text'} value={UserData?.firstName || ""} onChange={(e) => setUserData({ ...UserData, firstName: e.target.value })} />
                    {errors.firstName.length ? <p className=' text-red-400 text-sm font-body'>{errors?.firstName}</p> : null}
                </div>
                <div className=' md:w-2/5 w-10/12 m-auto '>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='MiddleName'
                        type={'text'} value={UserData?.middleName || ""} onChange={(e) => setUserData({ ...UserData, middleName: e.target.value })} />
                </div>
                <div className=' md:w-2/5 w-10/12 m-auto '>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='LastName' onBlur={() => setInputTouch({ ...inputTouch, lastName: true })}
                        type={'text'} value={UserData?.lastName || ""} onChange={(e) => setUserData({ ...UserData, lastName: e.target.value })} />
                    {errors.lastName.length ? <p className=' text-red-400 text-sm font-body'>{errors?.lastName}</p> : null}
                </div>
                <div className=' md:w-2/5 w-10/12 m-auto '>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='Username' onBlur={() => setInputTouch({ ...inputTouch, username: true })}
                        type={'text'} value={UserData?.username || ""} onChange={(e) => setUserData({ ...UserData, username: e.target.value })} />
                    {errors.username.length ? <p className=' text-red-400 text-sm font-body'>{errors?.username}</p> : null}
                </div>
               
                <div className=' md:w-2/5 w-10/12 m-auto '>
                    <input className='md:w-full h-11 py-2 rounded-xl text-gray-700'
                        placeholder='Email' onBlur={() => setInputTouch({ ...inputTouch, email: true })}
                        type={'email'} value={UserData?.email || ""} onChange={(e) => setUserData({ ...UserData, email: e.target.value })} />
                    {errors.email.length ? <p className=' text-red-400 text-sm font-body'>{errors?.email}</p> : null}
                </div>
                
                    
                    
                <div className=' md:w-2/5 w-10/12 h-auto md:ml-14 md:mr-auto mx-auto'>
                    <Button text={"Submit"} />
                </div>

            </form>
}
        </div>
    );
}

export default EditUser;
