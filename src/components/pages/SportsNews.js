import React, { useEffect, useState } from 'react';
import { api_url } from '../../app/index';
import axios from 'axios';
import ArticleCard from '../ArticleCard';
import { FcEmptyFilter } from 'react-icons/fc';
const SportsNews = ({setActiveNavLink}) => {
    const categoryName = "sports";
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [emptyResponseMessage, setemptyResponseMessage] = useState('');

    useEffect(() => {
        setActiveNavLink("sports")
        const fetchArticles = async () => {
            setloading(true)
            setemptyResponseMessage('')
            // console.log(formdata.get('name'));
            await axios.get(api_url + `/articles/category/${categoryName}`)
                .then(res => {
                    setloading(false)
                    setisError(false)
                    console.log(res);
                    if (res?.status === 204) {
                        setemptyResponseMessage(`No Article for ${categoryName}`)
                    } else {
                        setarticles(res?.data)
                    }
                })
                .catch(err => {
                    setloading(false)
                    console.log(err);
                    setisError(true)
                })
        }
        fetchArticles()

    }, [])
    return (
        <div className='w-full h-full text-center'>
            {loading ? <div>
                <h4>Loading   ..............</h4>
            </div> :
                isError ? <p className='text-red-400 w-full md:mx-32'>An error occured</p>
                    : emptyResponseMessage?.length ?
                        <div className='h-auto w-60 my-10 inline-block bg-green-100 shadow m-auto align-middle items-center '>
                            <FcEmptyFilter className='empty-icon pt-10 text-black m-auto' />
                            <h4 className='text-center text-lg py-10 text-dark '>{emptyResponseMessage}</h4>
                        </div>
                        :
                        <div className='flex flex-row gap-1 flex-wrap items-center md:mx-8 ml-2'>
                            <h2 className='text-lg w-full text-start font-semibold uppercase py-2'>Sport News</h2>
                            {articles?.map((article, id) => (
                                <ArticleCard to={`/${article._id}`} article={article} key={id} />
                            ))
                            }
                        </div>
            }

        </div>
    );
}

export default SportsNews;
