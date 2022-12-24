import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api_url } from '../../app/index';

const School = () => {
    const [schools, setschools] = useState([]);
    useEffect(() => {
        const fetchSchools = async() => {
            await axios.get(api_url + '/school')
                .then(res => {
                    console.log(res.data);
                   setschools(res?.data)
                }).catch(err => {
                console.log(err);
            })
        }
        fetchSchools()
    }, [])

    const handleDelete = (school) => {
        console.log("delete");
        console.log(school);
    }
    const handleEdit = (school) => {
        console.log("edit");
        console.log(school);
    }
    return (
        <div className='w-full h-full overflow-x-hidden '>
            <h4 className='w-full h-auto text-lg py-4 text-gray-800 mx-8'>Manage Schools</h4>
            {schools.length ?
                <div className='w-full h-auto overflow-x-hidden'>
                    <table
                        className='border-collapse bg-white shadow border-spacing-0 md:1/2 w-full overflow-auto overflow-x-scroll m-auto md:mx-6'
                    >
                    <thead>
                        <tr>
                            <th className='text-left font-medium p-2 text-sm' >Name</th>
                            <th className='text-left font-medium p-2 text-sm'>Accronym</th>
                            <th className='col-span-2 text-left font-medium p-2 text-sm'>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {schools.map((school, id) => (
                                <tr className='font-semibold hover:bg-slate-100 hover:shadow cursor-pointer text-xs text-left p-2' key={id}>
                                    <td className='p-2'>{ school?.name}</td>
                                    <td className='p-2'>{ school?.accronym}</td>
                                    <td className='p-2'>
                                        <button
                                            className='p-2 text-sm text-white bg-green-600 outline-none rounded-md opacity-90 text-opacity-80 hover:opacity-100
                                            hover:text-opacity-100'
                                            onClick={() => handleEdit(school)}>
                                            Edit
                                        </button>
                                    </td>
                                    <td className='p-2'>
                                        <button className='p-2 text-sm text-white bg-red-500 outline-none rounded-md opacity-90 hover:opacity-100' onClick={() => handleDelete(school)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                           )) }
                        </tbody>
                </table>
            </div> : null}
        </div>
    );
}

export default School;
