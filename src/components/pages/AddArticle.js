import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api_url } from '../../app/index';
import UseAuth from '../../features/Auth/UseAuth';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddArticle = ({ setActiveNavLink, activeNavLink }) => {
  const navigate = useNavigate()
  const { user, token,isAdmin, isEditor } = UseAuth()

  const [articleData, setarticleData] = useState({ title: '', content: '', picture: null, school: '', category: '' });
  const [schools, setschools] = useState([]);
  const [categories, setcategories] = useState([]);
  const [adding, setadding] = useState(false);
  const [addSuccess, setaddSuccess] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
  const [addError, setaddError] = useState('');
  const [fetchError, setfetchError] = useState("");
  const [loadingData, setloadingData] = useState(false);
  const [picture, setpicture] = useState(null);
  const [pictSrc, setpictSrc] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const publisher = user?._id;
    const headlineInput = document.getElementById("headline")
    const chosenSchool = schools?.find((school) => school?.accronym === articleData?.school)
    const chosenCategory = categories?.find((cate) => cate?.name === articleData?.category);
    const fileData = new FormData();
    fileData.append('title', articleData?.title)
    fileData.append('isHeadline', headlineInput.checked)
    fileData.append("picture", picture)
    fileData.append("content", articleData?.content)
    fileData.append('category', chosenCategory?._id)
    fileData.append("school", chosenSchool?._id)
    fileData.append("publisher", publisher)
    // console.log(fileData.entries());
    // for (let i = 0; i < files.length; i++) {
    //   fileData.append('multi-files', files[i])
    // }
    setadding(true)
    setaddSuccess(false)
    setsuccessMsg('')
    setaddError('');
    await axios.post(api_url + "/articles", fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res)
        setsuccessMsg(res?.data?.message)
        setaddSuccess(true)
        setadding(false)

      })
      .catch(err => {
        console.log(err)
        setsuccessMsg('')
        setaddSuccess(false)
        setadding(false)
        setaddError(err?.response?.data?.message)
      })
  }
  useEffect(() => {
    
    setActiveNavLink("AddArtcile")
    const fetchData = async () => {
      setloadingData(true)
      const schoolRequest = axios.get(api_url + "/school")
      const categoryRequest = axios.get(api_url + "/category")
      await axios.all([schoolRequest, categoryRequest]).then(axios.spread((...res) => {
        setloadingData(false)
        setschools(res[0].data)
        setcategories(res[1].data)
        console.log(res);
      }))
        .catch(err => {
          setloadingData(false)
          console.log(err);
          setfetchError(err?.response?.data?.message)
        })
    }
    if (isAdmin || isEditor) {
       fetchData()
    } else {
        navigate('/login')
    }
    return () => {

    };
  }, []);

  const handlePictureChange = (e) => {
    setpicture(e.target.files[0])
    const img = e.target.files[0]
    const fileReader = new FileReader();

    fileReader.onload = x => {
      setpictSrc(x.target.result);
    }
    fileReader.readAsDataURL(img)
    

}
  return (
    <div>
      <div className=" h-full w-full">
        {loadingData ? <p className='text-center py-6'>Loading....</p> :
          fetchError ? <div className=''>
            <p className='text-center pt-10 text-red-400 font-semibold'>{fetchError}</p></div> :
            <form id='form'  className='mr-auto md:ml-4 ml-2'
            onSubmit={handleSubmit}>
              <h1 className='text-lg font-medium font-display text-start pb-2'>Upload News Article</h1>
              {successMsg ? <p className='py-1 text-green-600 text-lg mx-auto '>{successMsg}</p> : null}
              {addError ? <h4 className='text-red-500 w-full font-semibold text-sm m-auto text-center'>
                {addError}</h4> : null}
              <div className={`${pictSrc ? 'h-96' : "h-0 py-40 shadow "} w-96 float-right md:mr-2 border-1 rounded text-center `}>
                {!pictSrc? <h3 className='font-semibold text-lg'>Preview Image</h3> : <img src={pictSrc} alt="" className='h-full w-full rounded-sm' />}
               </div> 
              <div className="mb-4 md:w-1/3 w-11/12 md:ml-0 mr-2">
                <label htmlFor='title'>Article Title</label>
                <input className='rounded' name='title' onChange={e => setarticleData({ ...articleData, title: e.target.value })} id='title' placeholder="Enter article title" />
              </div>

              <div className="input-group">
                <label htmlFor='files' className='w-20 h-16 rounded-sm py-4 relative text-center bg-slate-300'>
                  <FaUpload className='mx-auto my-auto '/>
                  Picture
                  <input hidden className='rounded' onChange={handlePictureChange} id='files' type="file" multiple />
                </label>
              </div>
              <div className="w-full h-auto m-auto ">
                <select className='border-1 md:w-96 w-full h-12 rounded px-2 mx-auto my-3' value={articleData?.school}
                  onChange={(e) => setarticleData({ ...articleData, school: e.target.value })}
                  multiple={false}
                >
                  {!articleData?.school ? <option>Select School</option> : null}
                  <option>None</option>
                  {schools?.map((school, id) => (
                    <option key={id} value={school?.accronym}>{school?.accronym?.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="w-full h-auto m-auto ">
                <select className='border-1 md:w-96 w-full h-12 rounded px-2 mx-auto my-3' value={articleData?.category}
                  onChange={(e) => setarticleData({ ...articleData, category: e.target.value })}
                  multiple={false}
                >
                  {!articleData?.category ? <option>Select Category</option> : null}
                  {categories?.map((cate, id) => (
                    <option key={id} value={cate?.name}>{cate?.name?.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="md:w-1/2 md:mx-1 w-11/12 h-96">
                <label htmlFor='content'>Content</label>
                <textarea name='content' cols={'auto'} rows="auto"
                  onChange={e => setarticleData({ ...articleData, content: e.target.value })} id=''
                  className='p-2 w-full h-full border-gray-500 border-1'
                />
              </div><br />
              <div className="w-72 ml-0 h-auto my-3 items-center justify-items-start">
                <label className='text-xl font-semibold ml-0 flex flex-row gap-1 pt-2' htmlFor='headline'>Headline
                  <input id='headline' type="checkbox" className='h-6 w-6 ml-2'
                  />
                </label>
              </div> <br />
              <button disabled={adding} className="w-96 h-16 py-2 px-20 rounded px-auto text-xl font-bold bg-green-900 text-white" type='submit'>
                {adding ? "Posting article" : "Post Article"}
              </button>
            </form>
        }
      </div>
    </div>
  );
}

export default AddArticle;
