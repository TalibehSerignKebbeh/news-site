import React, { useState } from 'react';
import axiosInstance from '../../API';
import UseAuth from '../../features/Auth/UseAuth';
const CommenForm = ({ articleId, addSuccess, setAddSuccess }) => {
    const { user } = UseAuth()
    const userId = user?._id;
    const [message, setmessage] = useState('');
    const [commentSuccessMsg, setcommentSuccessMsg] = useState('');
    const [addingComent, setaddingComent] = useState(false);
    const AddComment = async (e) => {
        e.preventDefault()
        setaddingComent(true)
        setAddSuccess(false)
        await axiosInstance.post(`/articles/${articleId}/comment`, { message, userId })
            .then(res => {
                setAddSuccess(true)
                setaddingComent(false)
                setcommentSuccessMsg(res.data?.message)
                console.log(res);
            })
            .catch(err => {
                setAddSuccess(false)
                setaddingComent(false)
                console.log(err);
                // if(Number(err?.data))
            })
    }
    return (
        <form onSubmit={AddComment}
            className='mt-0 md:ml-6 mr-auto md:w-1/3 w-full my-2  h-auto py-1 text-start flex flex-col justify-items-end'>
            {commentSuccessMsg ? <p className='text-green-700 font-semibold text-sm'>{commentSuccessMsg}</p> : null}
            <label htmlFor='comment' className='text-sm font-semibold block px-2'>Comment</label>
            <textarea type={'text'}
                className=" px-1 w-full ml-1  h-24 border-gray-700 border-1 rounded" value={message}
                onChange={(e) => setmessage(e.target.value)}

            />
            <div className='w-full text-end mr-18'>
                <button disabled={addingComent} type={"submit"}
                    className='mt-1 ml-1 float-right text-sm w-20 md:h-10 h-9  bg-orange-400 text-white shadow-xl opacity-80 hover:opacity-100 rounded-md'>
                    {addingComent? "posting": 'submit'}
                </button>
            </div>
        </form>
    );
}

export default CommenForm;
