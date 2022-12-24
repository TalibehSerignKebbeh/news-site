import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FcEmptyFilter } from "react-icons/fc"
import { api_url } from '../../app/index';
import UseAuth from '../../features/Auth/UseAuth';
import EditArticle from './EditArticle';
// import { Link } from 'react-router-dom';
// import img from '../../img/mydefaultprofile.png'
import './ArticlePage.css'
import FullArticle from '../FullArticle';

const ArticlePage = ({ setActiveNavLink }) => {
    const { id } = useParams()
    const { isAdmin, isEditor} = UseAuth();
    const [article, setarticle] = useState(null);
    // const [paragraphs, setparagraphs] = useState([]);
    // const [otherArticles, setotherArticles] = useState([]);

    useEffect(() => {
        setActiveNavLink("")
        // const fetchArticles = async () => {
        //     setloading(true)
        //     setisError(false)
        //     await axios.get(api_url + `/articles/${id}`, {headers: {'authorization': `Bearer ${token}`}})
        //         .then(res => {
        //             setisError(false)
        //             setloading(false)
        //             console.log(res);
        //             setarticle(res?.data)
        //             // console.log(res.data?.article);
        //             // setotherArticles(res?.data?.articles)
        //         })
        //         .catch(err => {
        //             setloading(false)
        //             setisError(true)
        //             console.log(err);
        //         })
        // }
        // if (!(isAdmin || isEditor)) {
        //     fetchArticles()
        // }
        return () => {

        };
    }, [id, setActiveNavLink]);

    return ((isAdmin || isEditor) ?
              <EditArticle id={id} />
        :
              <FullArticle setarticle={setarticle} article={article} id={ id} />
    

    );
}

export default ArticlePage;

