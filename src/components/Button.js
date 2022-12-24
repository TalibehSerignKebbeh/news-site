import React from 'react';

const Button = ({type, disabled, text}) => {
    return (
        <button disabled={disabled} type={type}
            className='md:text-2xl text-sm md:w-60 w-48 md:h-14 h-10 m-auto mt-4 bg-orange-400 text-white shadow-xl opacity-80 hover:opacity-100 rounded-md'>
           {text}
        </button>
    );
}

export default Button;
