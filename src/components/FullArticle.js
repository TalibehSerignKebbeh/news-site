import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api_url } from '../app/index';
import CommenForm from './Commet/CommenForm';
import CommentCard from './Commet/CommentCard';
import UseAuth from '../features/Auth/UseAuth';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import axiosInstance from '../API';

const FullArticle = ({ article, setarticle, id }) => {
    const { user } = UseAuth()
    const authorImage = article?.author?.profile;
    const [loading, setloading] = useState(true);
    const [isError, setisError] = useState(false)
    const [addSuccess, setaddSuccess] = useState(false);
    const [relatedArticles, setrelatedArticles] = useState([]);
    useEffect(() => {
        const fetchArticles = async () => {
            setloading(true)
            setisError(false)
            await axiosInstance.get(api_url + `/articles/id/${id}?sizeOfOthers=5`)
                .then(res => {
                    setisError(false)
                    setloading(false)
                    console.log(res);
                    setarticle(res?.data?.article)
                    setrelatedArticles(res?.data?.relatedArticles)
                    // console.log(res.data?.article);
                    // setotherArticles(res?.data?.articles)
                })
                .catch(err => {
                    setloading(false)
                    setisError(true)
                    console.log(err);
                })
        }
        fetchArticles()

    }, [id])

    return (
        <div className='w-full h-auto overflow-x-hidden '>
            {loading ? <div className='text-gray-600 m-auto '> <p>loading ...</p></div> :
                article ?
                    <div className='w-full md:mx-3 mx-1 h-full flex flex-col flex-wrap gap-2 m-auto justify-center items-start align-top'>
                        <div className='my-shadow md:w-8/12 w-10/12  m-auto ml-6 rounded-md h-full  text-center mb-auto mt-2 '>
                            <h2 className='text-start md:text-xl text-lg md:mx-2 md:px-6 px-3 text-gray-700 font-bold py-7'>{article?.title}</h2>
                            <img src={api_url + "/" + article?.img} className='w-11/12 h-96 m-auto mr-auto cursor-pointer text-start' alt='' />
                            {article.author ?
                                <div className='w-92 h-auto md:mx-9 ml-7 mr-auto mt-3'>
                                    <img src={api_url + `/${authorImage}`}
                                        alt="" className='w-6 h-6 left-0 right-auto rounded-xl' />
                                    <p className='text-sm font-light text-start w-full text-gray-500 '>{"Published by: " + article?.author?.firstName + " " + article?.author?.lastName}</p>
                                </div> : null}
                            <div className='md:w-full full h-full pt-6 mb-5'>
                                {article?.sections ? article?.sections?.map((parag, id) => (
                                    <p key={id} className='commentParag px-7 text-gray-700 md:py-3 py-2 text-start font-display font-normal'>{parag?.trim()}</p>
                                )) :
                                    <p className='text-gray-700 p-7 text-lg font-display font-medium text-start'>{article?.content}</p>
                                }
                            </div>

                        </div>
                        {relatedArticles?.length ?
                            <>
                            <h4 className='w-full mx-8  mt-3 mb-0 text-lg font-bold italic'>Related Stories</h4>    
                            <div className='the-shadow w-auto m-auto p-0 rounded-lg  mx-8 flex flex-row gap-2'>
                                {relatedArticles?.map((article, id) => (
                                    <ArticleCard article={article} key={id} />
                                ))}</div>
                            </>
                                 : null}
                        {/* Comment section */}
                        {user ? <CommenForm articleId={article?._id} addSuccess={addSuccess} setAddSuccess={setaddSuccess} />
                            :
                            <section className='w-auto mx-8 px-1  pt-3'>
                                <p>
                                    <Link to={'/login'} className="underline text-blue-300 " >Login</Link>  to comment
                                </p>
                            </section>}
                        {article?.comments?.length ?
                            <div className='shadow md:w-8/12 w-11/12 
                            flex flex-col gap-2 m-auto md:ml-9 h-auto
                            mb-9 text-center mt-2 py-4 rounded-md'>
                                <h4 className='text-start w-full px-1 
                                mt-3 mb-0 text-lg font-medium italic'>
                                    Comments
                                </h4>    
                                
                                {article?.comments?.map((singleComment, id) => (
                                    <CommentCard comment={singleComment} key={id} />
                                ))}

                            </div>
                            :
                            <section className=' p-3 w-auto mx-6 mb-4 text-base'>
                                <p className='p-2 text-lg'>This Article has no comments</p>
                                {/* <p><Link to={'/login'} className="underline text-blue-300 " >Login</Link>  to comment </p> */}
                            </section>}

                    </div> :
                    <div className='md:w-2/5 w-11/12 h-auto p-3 m-auto text-center bg-gray-500 mt-9'>
                        <div className='w-full text-center py-6 '>
                            Opps Article Not Found
                        </div>
                        <hr />
                        <div></div>
                    </div>}
        </div>
    );
}

export default FullArticle;
