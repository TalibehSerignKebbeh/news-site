import React, { useState } from 'react';
import UseAuth from '../../features/Auth/UseAuth';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './index.css'
import { api_url } from '../../app/index';
import axios from 'axios';
import {formatDistanceToNow, parseISO} from 'date-fns'
const CommentCard = ({ comment }) => {
    const { user,token, isAdmin, isEditor } = UseAuth()
    const isAuthor = user?.username === comment?.author?.username;
    const authorImage = comment?.author?.profile;
    const fullName = comment?.author?.firstName + ' ' + (comment?.author?.middleName + ' ' || '') + comment?.author?.lastName
    const [deleteing, setdeleteing] = useState(false);
    const [deleteSuccess, setdeleteSuccess] = useState(false);
    const aborter = new AbortController()
    


    const handleDeleteComment = async () => {
        console.log('deleting');
        setdeleteing(true)
        setdeleteSuccess(false)
        await axios.delete(api_url + `/articles/${comment?.articleId}/comment/${comment?._id}`, { headers: { 'authorization': `Bearer ${token}` } })
            .then(res => {
        setdeleteing(false)
        setdeleteSuccess(true)
            console.log(res);
            }).catch(err => {
        setdeleteing(false)
            console.log(err);
        })
    }
    return (
        <div className='commentCard md:w-3/4 w-11/12 mx-1 h-auto shadow flex flex-row py-2 rounded-lg mb-3'>
            {authorImage ? <img src={api_url + `/${authorImage}`} className={`fifty-percent-radius float-left w-11 h-11 top-0 mx-2 right-auto  mb-1`} alt='' />
                :
                <div className='fifty-percent-radius float-left w-11 h-11 top-0 mx-2 right-auto inline-flex mb-1 bg-gray-500 text-center'>
                    <p className='m-auto text-white font-semibold'>{comment?.author?.firstName?.substr(0, 1)}</p>
                </div>}
            <div className='w-full text-clip'>
            <h3 className='text-left ml-1 font-medium capitalize px-1 top-0 text-sm'>{fullName}</h3>
                <p className='text-start mr-auto ml-1 px-1 py-1 text-sm font-normal '>
                    {comment?.message}
                </p>
                {comment?.createdAt ? <p className='from-time ml-2 text-start font-extralight'>{ formatDistanceToNow(parseISO(comment?.createdAt)) +" ago"}</p>: null}
            </div>
            {(isAdmin || isAuthor || isEditor) ?
                <div className='float-right w-auto text-end  mr-1'>
                {isAuthor ? <button disabled={false} type={"submit"}
                    className=' text-sm  text-gray-700 shadow-xl opacity-80 hover:opacity-100 scale-125'>
                    <FaEdit />
                </button> : null}
                <button disabled={false} type={"submit"} onClick={handleDeleteComment}
                    className=' text-sm  text-gray-700 ml-3 shadow-xl opacity-80 hover:opacity-100 scale-125'>
                        {<FaTrash />}
                </button>
            </div>
             : null}
        </div>
    );
}

export default CommentCard;
