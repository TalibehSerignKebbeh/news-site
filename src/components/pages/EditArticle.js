import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa'
import { api_url } from '../../app/index';
import { useNavigate } from 'react-router-dom';
import FullArticle from '../FullArticle';
import UseAuth from '../../features/Auth/UseAuth';
import { FcFullTrash } from 'react-icons/fc';
import axiosInstance from '../../API';

const EditArticle = ({ id }) => {
    const {token, isAdmin, isEditor } = UseAuth()
   const config = {headers: {'authorization': `Bearer ${token}`}}
    const navigate = useNavigate();
    const { articleId } = useParams()
    const [article, setarticle] = useState(null);
    const [deleteError, serDeleteError] = useState('');
    const [loading, setloading] = useState(false);
    const [uploading, setuploading] = useState(false);
    const [categories, setcategories] = useState([]);
    const [schools, setschools] = useState([]);
    const [deleting, setDeleting] = useState(false)
    const [imgFile, setimgFile] = useState(null);
    const [newImgSrc, setnewImgSrc] = useState();
    const [successMsg, setsuccessMsg] = useState('');
    const [EditArticle, setEditArticle] = useState(true);

    useEffect(() => {
        setsuccessMsg("")
        const fetchAllData = async () => {
            setloading(true)
            const fetchCates = axiosInstance.get(api_url + "/category");
            const fetchSchools = axiosInstance.get(api_url + "/school");
            const fetchArticle = axiosInstance.get(api_url + `/articles/${id}`)
        
            await axios.all([fetchArticle, fetchCates, fetchSchools]).then(axios.spread((...res) => {
                setarticle(res[0]?.data)
                console.log(res[0]?.data);
                setcategories(res[1]?.data)
                setschools(res[2]?.data)
                console.log(res);
                setloading(false)
            })).catch(err => {
                console.log(err);
                setloading(false)
                // setisError()
            })
        }

        if (isAdmin || isEditor) { fetchAllData() }
        else {
            navigate('/login')
        }
        return () => {

        };
    }, [articleId, id,]);
    const handleUpdate = async (e) => {
        e.preventDefault();
        setsuccessMsg("")
        // const selectedSchool = schools?.find(sch=>sch.)
        const articleData = new FormData()
        articleData.append('title', article?.title)
        articleData.append('publisher', article?.publisher)
        articleData.append('content', article?.content)
        articleData.append('img', article?.img)
        articleData.append('picture', imgFile)
        articleData.append('school', article?.school)
        articleData.append('category', article?.category)
        console.log({ article });
        setuploading(true)
        await axiosInstance.post(api_url + `/articles/${article._id}`, articleData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setuploading(false)
                console.log(res);
                console.log(res?.data);
                setsuccessMsg(res?.data?.message)
            }).catch(err => {
                setloading(false)
                console.log(err);
            }).finally(() => setuploading(false))

    }
    const handleImgChange = (e) => {
        console.log("changing image");
        const img = e.target.files[0]
        setimgFile(e.target.files[0]);

        const fileReader = new FileReader();
        fileReader.onload = x => {
            console.log("file reader");
            setnewImgSrc(x.target.result)
            console.log(x.target.result);
        }
        fileReader.readAsDataURL(img)

    }
    const handleDelete = async () => {
        setDeleting(true)
        await axiosInstance.delete(api_url + `/articles/${article?._id}`)
            .then(res => {
                setDeleting(false)
                console.log(res);
                navigate(-1)
            })
            .catch(err => {
                setDeleting(false)
                console.log(err);
                serDeleteError(err?.response?.date?.message)
            })
    }
    return (
        <div className='w-full h-full overflow-x-hidden'>
            {loading ?
                <div className='inline-flex items-center justify-center w-full h-full'>
                    <p className='m-auto'>Loading</p>
                </div>
                : article ?
                    <div className='w-full h-auto'>
                        <div className='w-auto px-36 float-right mt-1'>
                            <button className='float-right w-20 px-1 h-10 bg-orange-300 mt-1 text-white rounded-md'
                                onClick={() => setEditArticle(prev => !prev)}
                            >{EditArticle ? "Read" : "Edit"}</button>
                        </div>
                        {EditArticle ? <form onSubmit={handleUpdate}
                            className='flex flex-col  w-auto h-full mb-2 shadow bg-white m-auto items-center md:justify-items-stretch justify-start'>
                            {deleteError ? <p className='text-red-600 text-sm text-start font-semibold'>{ deleteError}</p> : null}
                            <div className='text-start  w-full flex flex-row items-center justify-between'>
                                <h2 className='text-start float-left text-black text-xl font-semibold font-display my-3 ml-4 w-full'>Edit Article</h2>
                                <button onClick={handleDelete}
                                    className='delete-btn float-right mr-1 text-red-500'>
                                    {deleting? "deleting ..... ": <FcFullTrash />}</button>
                            </div>
                            {<p className='w-full text-center m-auto text-green-300 text-sm py-1 font-semibold'>{successMsg}</p>}
                            <div className=' flex flex-row gap-1 flex-wrap h-auto text-white mb-8 w-fit ml-2 mr-auto justify-self-start'>
                                <img src={newImgSrc ? newImgSrc : api_url + "/" + article?.img} alt=""
                                    className='md:w-80 w-44 md:h-72 h-52 m-0 ml-1'
                                />
                                <label htmlFor='img' className='mt-auto mb-0 pl-1 mr-auto w-20 h-16 bg-gray-300 text-black rounded-sm cursor-pointer inline-flex items-center justify-center'>
                                    <FaUpload />
                                    <input id='img' hidden onChange={handleImgChange} type={'file'} className="m-auto pl-1 md:mb-2" />
                                </label>
                            </div>
                            <label htmlFor='title' className='text-start font-semibold  pl-1 mr-auto mt-auto -mb-1 pb-1'>Title</label>
                            <input type={'text'} value={article?.title} id="title"
                                className="md:w-1/2 w-11/12 h-10 px-2 py-1 mb-6 md:mr-auto md:mx-1 pl-1 mr-auto md:text-lg text-xs rounded-sm  "
                                placeholder='Article title'
                                onChange={(e) => setarticle({ ...article, title: e.target.value })}
                            />
                            <label htmlFor='title' className='text-start font-semibold pl-1 mr-auto mt-auto -mb-1 pb-1'>School</label>
                            <select className='md:w-1/3 w-10/12 h-10 rounded border-1 mb-3 md:mr-auto ml-1 mr-auto' value={article?.school}
                                onChange={e => setarticle({ ...article, school: e.target.value })}>
                                {schools?.map((school, id) => (
                                    <option key={school?.name} value={school?._id}>{school?.name}</option>
                                ))}
                            </select>
                            <label htmlFor='title' className='text-start font-semibold ml-1 mr-auto mt-auto -mb-1 pb-1'>Category</label>

                            <select className='md:w-1/3 w-10/12 h-10 rounded border-1 mb-3 md:mr-auto md:ml-1 pl-1 mr-auto' value={article?.category}
                                onChange={e => setarticle({ ...article, category: e.target.value })}>
                                {categories?.map((category, id) => (
                                    <option key={category?.name} value={category?._id}>{category?.name}</option>
                                ))}
                            </select>
                            <label htmlFor='content' className='text-start font-semibold pl-1 mr-auto mt-auto -mb-1 pb-1'>Content</label>
                            <textarea value={article?.content} id="content"
                                className=" md:w-8/12 w-full md:mr-auto mx-1 px-1 m-auto"
                                onChange={e => setarticle({ ...article, content: e.target.value })}
                            />
                            <button disabled={loading}
                                className='md:w-72 w-44 mr-auto md:ml-4 mx-auto bg-orange-500 h-14 text-center text-white shadow-transparent rounded text-lg mx-auto mt-4 mb-2'>
                                {uploading ? "Loading..." : "Submit"}
                            </button>
                        </form> : <FullArticle setarticle={setarticle} article={article} id={id} />}
                    </div>
                    : <div className='w-72 h-72 m-auto mt-5 bg-slate-300 shadow rounded-sm '>
                        <h3 className='text-start px-4 '>Article Not Found</h3>
                    </div >}
        </div>
    );
}

export default EditArticle;
