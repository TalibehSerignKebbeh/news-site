import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api_url } from '../../app/index';
import ArticleCard from '../ArticleCard';
import { myProfileData } from '../../features/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const News = ({ setActiveNavLink, activeNavLink }) => {
  const navigate = useNavigate();
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [isError, setisError] = useState(false)
  const [percentage, setpercentage] = useState(0);
  const [totalArticles, settotalArticles] = useState(0);
  const [toopStory, settoopStory] = useState(null);

  useEffect(() => {

    setActiveNavLink("articles")
    const fetchArticles = async () => {
      setloading(true)
      setisError(false)
      await axios.get(api_url + "/articles", {
        onDownloadProgress: (progressEvent) => {
          console.log(progressEvent.loaded);
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setpercentage(percentage)
          console.log(progressEvent.total);
        }
      })
        .then(res => {
          setisError(false)
          setloading(false)
          setarticles(res.data?.articles)
          settotalArticles(res?.data?.total)
          console.log(res.data);
        }).then(() => {
          settoopStory(articles?.find(article => article?.isHeadline === true))
          console.log(articles?.find(article=>article?.isHeadline===true));
        })
        .catch(err => {
          setloading(false)
          setisError(true)
          console.log(err?.response?.data);
        })
    }
    fetchArticles()

    // if (profile) {
    //   fetchArticles()
    // } else {
    //   navigate("/login")
    // }
    return () => {

    };
  }, []);

  return (
    <div>
      {loading ?
        <div>
          <progress value={percentage} ></progress>
          <p className='text-center p-5 text-2xl text-white'>Loading........</p>
        </div>
        : isError ?
          <div className='inline-flex content-center items-center  w-full m-auto'>
            <p className='m-auto text-red-500 text-sm '>An errored occured while fetching data check console</p>
          </div>
          : <div className='article-grid mt-5 w-full h-auto items-center justify-start px-2 md:mx-6 mx-4'>
            {/* <h3 className=' text-center text-white text-lg w-full my-4 mx-auto'>News Articles </h3> */}
            
            {articles?.map((article, id) => (
              <Link to={`/${article?._id}`} key={id}
                className={`${article?.isHeadline? 'main-grid-item h-full ': 'grid-item'}  shadow border-2 border-white text-start  bg-white 
                rounded  cursor-pointer hover:shadow-inner hover:border-slate-400 hover:bg-slate-200`}>
                <div className={`${article?.isHeadline? ' w-full h-1/2 mr-auto ml-0': ' w-4/12'} h-full clear-both`} >
                  {/* {article?.isHeadline ? <h3 className='category-desc absolute mt-auto bg-white'>Headline</h3> : null} */}
                  <img src={api_url + "/" + article?.img} className="w-full h-full rounded-sm" alt='' />
                </div>
                <div className='m-auto ml-auto mr-0 text-start p-0 py-1 h-full w-full '>
                  <p
                    className='articleTitle  py-1 md:text-gray-700 text-gray-500 font-semibold  mx-1 text-start '>
                    {article?.title}
                  </p>
                </div>
              </Link >
            ))}
          </div>
      }

    </div>
  );
}

export default News;
