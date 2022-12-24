import React from 'react';
// import { FaRegEdit } from 'react-icons/fa';
// import { FcFullTrash } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { api_url } from '../app/index';
// import UseAuth from '../features/Auth/UseAuth';

const ArticleCard = ({ article }) => {
  // const { user, isAdmin, isEditor } = UseAuth()

  // const articleTitle = article?.title?.trim()?.split(" ").join('-').split('/').join('%').toString()
  return (
    <Link to={`/${article?._id}`} 
      className='articleCard md:w-64 w-36 shadow border-2 border-white text-start md:h-64  bg-white rounded
               cursor-pointer hover:shadow-inner hover:border-slate-400 hover:bg-slate-100'>
      <div className='w-full md:h-32 h-16 clear-both' >
        {article?.isHeadline? <h3 className='category-desc absolute mt-auto bg-white'>Headline</h3> : null}
        <img src={api_url + "/" + article?.img} className="w-full h-full rounded-sm" alt='' />
      </div>
      <div className='m-auto mx-1 text-start p-0 py-1 h-full w-full '>
        <p
          className='articleTitle  py-1 md:text-gray-700 text-gray-500 font-semibold  mx-1 text-start '>
          {article?.title}
        </p>
      </div>
    </Link >


  );
}

export default ArticleCard;


{/* {isAdmin ? <button className='mt-0 float-right mr-1 scale-150 pb-1' ><FcFullTrash /></button> :
        isEditor && user?._id === article?.puublisher ?
          <div>
            <button className='mt-0 float-right mr-1 scale-150 pb-1'><FcFullTrash /></button>
            <button className='mt-0 float-right mr-1 scale-150 pb-1'><FaRegEdit /></button>
          </div>
          : null
      }  */}