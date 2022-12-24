import React from 'react';

const Trash = () => {
    return (
        <div>
            {/* 
            <div className='my-3 grid md:grid-cols-4 md:col-span-2 content-start md:ml-8 mx-4
                    grid-cols-2  gap-y-0 gap-x-1  items-stretch justify-center'>
                        <div className='col-start-1  md:col-end-4 col-span-2 row-start-1 md:row-span-5 row-span-full mb-8'>
                            <h2 className='text-start md:text-2xl text-lg  px-4 text-gray-700 font-bold pb-4'>{article?.title}</h2>
                            <img src={api_url + "/" + article?.img} className='md:w-11/12 h-96 m-auto w-10/12  cursor-pointer text-start' alt='' />
                            {article.author ? <div className='w-92 h-auto md:mx-6 ml-6 mr-auto mt-3'>
                                <img src={article?.author?.img ? api_url + `/${article?.author?.img}` : noProfile}
                                    alt="" className='w-6 h-6 left-0 right-auto rounded-sm' />
                                <p className='text-sm font-semibold text-start w-full text-gray-500 '>{"Published by: " + article?.author?.firstName + " " + article?.author?.lastName}</p>
                            </div> : null}
                            <div className='md:w-full full h-full pt-6 mb-5'>
                                {article?.sections ? article?.sections?.map((parag, id) => (
                                    <p key={id} className='px-7 text-gray-700 md:py-3 py-2 text-lg text-start font-display font-medium'>{parag?.trim()}</p>
                                )) :
                                    <p className='text-gray-700 p-7 text-lg font-display font-medium text-start'>{article?.content}</p>
                                }
                            </div>
                        </div>

                        {otherArticles.length ? otherArticles?.map((art, id) => (
                            <div className='h-auto w-auto md:col-span-1 md:row-span-1 col-span-2 row-span-2 md:m-auto sm:mx-3 bg-violet-300' key={id}>
                                <Link to={`/${art?._id}`} className=' flex flex-row w-full h-full m-auto items-start '>
                                    <div className='w-1/3 h-32 ml-0'>
                                        <img src={api_url + "/" + art?.img} alt="" className='w-full h-full' />
                                    </div>
                                    <div className='w-3/4 px-5 h-full inline-flex items-stretch py-1 font-semibold'>
                                        <h3 className='text-14 text-left text-black '>{art?.title}</h3>
                                    </div>

                                </Link>
                            </div>

                        )) : null}
                    </div> */}
        </div>
    );
}

export default Trash;
