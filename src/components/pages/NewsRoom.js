import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { api_url } from '../../app/index';
import { FaPersonBooth } from 'react-icons/fa';
import ArticleCard from '../ArticleCard';
import axiosInstance from '../../API';

const NewsRoom = ({ setActiveNavLink }) => {

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [isError, setisError] = useState(false)
  const [total, settotal] = useState(0);
  const [pageSize, setpageSize] = useState(7);
  const [page, setpage] = useState(0);
  // const [headLine, setheadLine] = useState({});
  const [totalNumberOfPages, settotalNumberOfPages] = useState(0);

  useEffect(() => {
    setActiveNavLink("home")
    const fetchArticles = async () => {
      setloading(true)
      setisError(false)
      await axiosInstance.get(`/articles?pageSize=${pageSize}&&page=${page}`)
        .then(res => {
          setisError(false)
          setloading(false)
          setarticles(res?.data?.articles)
        settotalNumberOfPages(Math.ceil(Number(res?.data?.total) / Number(pageSize)))
          settotal(Number(res?.data?.total))
          console.log(res.data);
        })
        .catch(err => {
          setloading(false)
          setisError(true)
          console.log(err);
          console.log(err?.response?.data);
        })
    }
    fetchArticles();
    return () => {

    };
  }, [page]);
  return (

    <div className=' w-full relative m-auto overflow-x-hidden'>
      {loading ?
        <div>  <p className='text-center p-5 text-2xl text-black'>loading</p>
        </div>
        : isError ?
          <div className='flex flex-col content-center items-center md:w-400 w-52 md:h-60 h-52 
                relative bg-white shadow m-auto mb-0 mt-16 justify-items-stretch
          '>
            <FaPersonBooth className='text-gray-600 w-16 h-16 my-10 ' />
            <p className=' align-middle  mx-auto text-gray-600 md:text-lg text-sm  '>
              Error fetching data check console</p>
          </div>
          :
          <div className='my-shadow  rounded mt-5 bg-white py-3 
          flex flex-row flex-wrap  gap-3 md:mx-8 mx-6 w-full h-auto items-center
          md:justify-start  px-2 overflow-clip'>
            {/* <h3 className='text-center text-gray-700 text-lg w-full my-4 mx-auto'>News Articles </h3> */}
            {articles?.map((article, id) => (
              <ArticleCard article={article} key={id} />
            ))}
            {totalNumberOfPages > 0 ?
              <div className='w-10/12 h-auto overflow-x-hidden mt-auto mb-5 text-xs text-center'>
              <div className='inline-block first:ml-0 mt-8 last:mr-0  mx-auto m-auto rounded-md w-auto overflow-x-scroll '>
                {[...Array(Number(totalNumberOfPages))]?.map((n, i) =>
                  <button onClick={() => setpage(i) } key={i}
                    disabled={i === page}
                    className={`${i === page ? 'bg-green-400' : 'bg-slate-500'} fifty-percent-radius ml-1 p-2 text-center text-14  w-9 h-9 text-white  `}>
                    {i + 1}
                  </button>)
                }
              </div>  
            </div> : null}
          </div> 
      }

    </div>
  );
}

export default NewsRoom;


export const CreatePageNumbers = ({ numberOfPages }) => {
  return [...Array(numberOfPages)].map((n, i) => <li key={i + 1}>{i + 1}</li>)
}