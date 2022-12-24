import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api_url } from '../../app/index';
import Button from '../Button';

const AddSchool = () => {
    const [school, setSchool] = useState({ name: "", accronym: '' });
    const [errors, seterrors] = useState({
        nameError: '', accronymError: ''
    });
    const [isToched, setisToched] = useState({nameToch: false, accronymToch: false});
    const [successMsg, setsuccessMsg] = useState('');
    const [adding, setadding] = useState(false);
    const handleAddSchool = async (e) => {
        e.preventDefault();
        setsuccessMsg("")
        if (errors.accronymError || errors.nameError) {
            setisToched({ nameToch: true, accronymToch: true })
            console.log(errors);
            return;
        };
        setadding(true)
        axios.post(api_url + '/school', school)
            .then(res => {
                setadding(false)
                console.log(res);
                setsuccessMsg(res?.data?.message)

            }).catch(err => {
                setadding(false)
                console.log(err);
            })
    }
    useEffect(() => {
        if (!school.name.length>0) {seterrors({...errors, nameError: 'school name is required'})}
         else if (!school.name.length >= 4) { seterrors({ ...errors, nameError: "school name is should be greater than 5 characters " }) }
        else{seterrors({...errors, nameError: ''})}
    }, [errors, school.name])
    useEffect(() => {
        if (!school.accronym.length>0) { seterrors({ ...errors, accronymError: "school accronym is required" }) }
        else{seterrors({...errors, accronymError: ''})}

    }, [errors, school.accronym])
    return (
        <div className='w-full h-full text-center relative md:overflow-auto overflow-x-hidden'>
            <form className='md:w-1/2 w-full md:mx-auto mt-3 mx-3 text-start shadow-sm rounded'
                onSubmit={handleAddSchool}>
                {successMsg ? <p className='w-auto h-auto text-lg text-center text-green-600'>{successMsg }</p> : null}
                <div className='w-full m-auto mb-2 ml-2 mr-auto '>
                    <label className='text-sm font-semibold px-0 -mb-1 py-2' htmlFor='name'>Name</label>
                    <input className={`${(errors.nameError.length) ? 'border-red-300' : 'focus:shadow-md'} mx-auto  h-11 px-4  py-2 text-gray-800 rounded-xl`}
                        type={'text'} value={school?.name} id="name" onChange={e => setSchool({ ...school, name: e.target.value })}
                        onClick={() => setisToched({ ...isToched, nameToch: true })} />
                    {errors.nameError && isToched.nameToch ? <span className='text-red-500 px-1 font-normal text-start text-sm'>{errors.nameError}</span> : null}
                </div>
                <div className='md:w-80 w-full m-auto mb-2 ml-2 mr-auto '>
                    <label className='text-sm font-semibold px-0 -mb-1 py-2' htmlFor='accronym'>Accronym</label>
                    <input className={`${(errors.accronymError.length) ? 'border-red-300' : 'focus:shadow-md'} mx-auto  h-11 px-4  py-2 text-gray-800 rounded-xl`}
                        type={'text'} value={school?.accronym} id="accronym" onChange={e => setSchool({ ...school, accronym: e.target.value })}
                        onClick={() => setisToched({ ...isToched, accronymToch: true })} />
                    {errors.accronymError && isToched.accronymToch ? <span className='text-red-500 px-1 font-normal text-start text-sm'>{errors.accronymError}</span> : null}
                </div>
                <div className='md:w-80 w-full m-auto mb-2 text-center'>
                    <Button disabled={adding} type={'submit'} text={"Add School"} ></Button>
                </div>
            </form>
        </div>
    );
}

export default AddSchool;
