import React, { useEffect, useState } from 'react';
import { api_url } from '../../app/index';
import UseAuth from '../../features/Auth/UseAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../API';
const Users = ({ setActiveNavLink }) => {
    const { user, token, isAdmin } = UseAuth()
    const navigate = useNavigate()
    const config = { headers: { 'authorization': `Bearer ${token}` } }

    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(false);
    // const [userToEdit, setuserToEdit] = useState(null);
    const [userToAcceptOrReject, setuserToAcceptOrReject] = useState(null);
    const [statusChanging, setstatusChanging] = useState(false);
    const [userToDelete, setuserToDelete] = useState(null);
    const [deleting, setdeleting] = useState(false);
    const [totalAmount, settotalAmount] = useState(0);
    const [pageSize, setpageSize] = useState(7);
    const [page, setpage] = useState(0);
    // const [headLine, setheadLine] = useState({});
    const [totalNumberOfPages, settotalNumberOfPages] = useState(0);

    useEffect(() => {
        setActiveNavLink('users')
        const fetchSchools = async () => {
            setloading(true)
            await axiosInstance.get(`/users?pageSize=${pageSize}&&page=${page}`)
                .then(res => {
                    setloading(false)
                    console.log(res.data);
                    setusers(res?.data?.users)
                    settotalAmount(Number(res?.data?.totalUsers))
                    settotalNumberOfPages(Math.ceil(Number(res?.data?.totalUsers) / Number(pageSize)))
                    console.log(Math.ceil(Number(res?.data?.totalUsers) / Number(pageSize)));
                }).catch(err => {
                    setloading(false)
                    console.log(err);
                })
        }
        if (isAdmin) {
            fetchSchools()
        }
    }, [page])
    const handleDelete = async (user) => {
        setuserToDelete(user)
        console.log("delete");
        setdeleting(true)
        await axiosInstance.delete(`/users/${user?._id}`, config)
            .then(res => {
                setdeleting(false)
                console.log(res);
            }).catch(err => {
                setdeleting(false)
                console.log(err);
            }).finally(() => {
                setuserToDelete(null)
            })
    }
    const handleStatusChange = async (user) => {
        setuserToAcceptOrReject(user)
        setstatusChanging(true)
        await axiosInstance.patch(`/users/${user?._id}`, config)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setstatusChanging(false)
                setuserToAcceptOrReject(null)
            })
    }
    // const handleEdit = async (user) => {
    //     console.log(user);
    //     return
    //     setuserToDelete(user)
    //     console.log("edit");
    //     setediting(true)
    //     await axios.put(api_url + `/users/${user?._id}`, config)
    //         .then(res => {
    //             setediting(false)
    //             console.log(res);
    //         }).catch(err => {
    //             setediting(false)
    //             console.log(err);
    //         })
    //     setuserToDelete(null)
    // }
    return (
        <div className='w-full h-full overflow-x-hidden '>
            {loading ? <div className='m-auto text-sm font-semibold text-red-400'> <p>loading ...</p></div> :
                <div className='w-full h-auto'>
                    <h4 className='md:full mx-8 h-auto text-lg py-4 text-gray-800 
                   md:after:w-11/12 after:h-0.5 after:bg-black after:block after:opacity-75 '>
                        Manage Users
                    </h4>
                    {users.length ?
                        <div className=' w-full h-auto overflow-x-scroll mb-5 py-4'>
                            <table
                                className='border-collapse h-auto bg-white shadow border-spacing-0 w-fit overflow-auto overflow-x-scroll m-auto md:mx-6'
                            >
                                <thead>
                                    <tr className='first:ml-0 '>
                                        <th className='  text-left font-medium p-2 pl-3 text-sm' >Firstname</th>
                                        <th className=' px-5 text-left font-medium py-2 text-sm' >Middlename</th>
                                        <th className=' px-5 text-left font-medium py-2 text-sm' >Lastname</th>
                                        <th className='px-5 text-left font-medium py-2 text-sm' >Email</th>
                                        <th className='px-5 text-left font-medium py-2 text-sm'>Role</th>
                                        <th className='px-5 text-left font-medium py-2 text-sm'>Status</th>
                                        <th className='pl-5 col-span-3  text-center font-medium py-2 text-sm'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y-1 pb-3 last:border-b-1 last:border-gray-600'>
                                    {users.map((user, id) => (
                                        <tr className='font-semibold hover:bg-slate-100 hover:shadow cursor-pointer text-xs text-left p-0' key={id}>
                                            <td className=' text-start p-2 pl-3 text-sm font-light'>{user?.firstName}</td>
                                            <td className='px-5  text-start py-2 text-sm font-light'>{user?.middleName}</td>
                                            <td className='px-5  text-start py-2 text-sm font-light'>{user?.lastName}</td>
                                            <td className='px-5  text-start py-2 text-sm font-light'>{user?.email}</td>
                                            <td className='px-5 py-2 text-sm font-light'>{user?.role}</td>
                                            <td className='px-5 py-2 text-sm font-light'>{user?.accepted ? "accepted" : "pending"}</td>
                                            <td className='p-2 text-sm font-light w-7'>
                                                <button
                                                    className={`px-3 py-1 text-sm text-white bg-green-500 outline-none rounded-md  hover:bg-green-800
                                            hover:text-opacity-100 shadow drop-shadow`}
                                                    onClick={() => navigate(`/users/${user?._id}`)}>
                                                    Edit
                                                </button>
                                            </td>
                                            <td className='py-2 text-sm font-light w-7'>
                                                <button className={`${user?.accepted ? 'bg-red-400' : 'bg-gray-400'} p-2 text-sm text-white outline-none rounded-md opacity-90 hover:opacity-100shadow drop-shadow`}
                                                    onClick={() => handleStatusChange(user)}>
                                                    {statusChanging && userToAcceptOrReject?._id === user?._id ? "loading" : user?.accepted ? 'Reject' : "Accept"}
                                                </button>
                                            </td>

                                            <td className='p-2 text-sm font-light w-7'>
                                                <button className={`bg-red-400 px-3 p-2 text-sm text-white outline-none rounded-md opacity-90 hover:opacity-100shadow drop-shadow`}
                                                    onClick={() => handleDelete(user)}>
                                                    {deleting && userToDelete?._id === user?._id ? "Reseting" : 'Reset'}
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className='text-center m-auto mt-9 h-auto overflow-x-hidden mb-5 text-xs'>
                                    
                                </tfoot>
                                
                            </table>
                            {totalNumberOfPages > 0 ?
                                            <div className='inline-flex  gap-1 justify-center  items-center md:mx-9 mx-auto m-auto mt-7 rounded-md w-auto overflow-x-scroll '>
                                                {[...Array(Number(totalNumberOfPages))]?.map((n, i) =>
                                                    <button onClick={() => setpage(i)} key={i}
                                                        disabled={i === page}
                                                        className={`${i === page ? 'bg-green-400' : 'bg-slate-500'} fifty-percent-radius ml-1 p-2 text-center text-14  w-9 h-9 text-white  `}>
                                                        {i + 1}
                                                    </button>)
                                                }
                                        </div> : null}

                        </div> : null}

                </div>
            }
        </div>
    );
}

export default Users;
