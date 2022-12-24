import React from 'react';
import { Link } from 'react-router-dom';
import { api_url } from '../app/index';

const RowCard = ({ article, to }) => {
    return (
        <Link to={to} className='flex flex-row md:w-80 w-72 h-20 m-auto items-stretch bg-white'>
            <div className='w-1/3 h-full m-0'>
                <img src={api_url+"/"+ article?.img} alt="" className='w-full h-full'/>
            </div>
            <div className='w-3/4 px-5 h-full inline-flex items-stretch py-1'>
                <h3 className='text-14 text-left text-black '>{article?.title }</h3>
            </div>
            
        </Link>
    );
}

export default RowCard;
