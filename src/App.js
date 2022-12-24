import { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewsRoom from './components/pages/NewsRoom';
import AddArticle from './components/pages/AddArticle';
import ArticlePage from './components/pages/ArticlePage';
import Login from './components/pages/Login';
import Navbar from './components/Navbar';
import SportsNews from './components/pages/SportsNews';
import ManagementNews from './components/pages/ManagementNews';
import UTGSUNews from './components/pages/UTGUSNews';
import AddSchool from './components/pages/AddSchool';
import School from './components/pages/School';
import EditSchool from './components/pages/EditSchool';
import UserProfile from './components/pages/UserProfile';
import RequireAuth from './components/RequireAuth';
import Register from './components/pages/Register';
import Users from './components/pages/Users';
import EditUser from './components/pages/EditUser';
// import axiosInstance  from './API/index'
// import { setCredentials } from './features/Auth/AuthSlice';
// import { useDispatch } from 'react-redux';

function App() {
  const [activeNavLink, setActiveNavLink] = useState("");
  // const dispatch = useDispatch()
  // const [category, setcategory] = useState("");
  
  useEffect(() => {
  //  axiosInstance.interceptors.request.use(
  //   (req) => {
  //     return req;
  //   },
  //   async (err) => {
  //     const prevRequest = err?.config;
  //     if (err?.status === 401 && !prevRequest?._retry) {
  //       await axiosInstance.get('/auth/refresh')
  //         .then(res => {
  //           dispatch(setCredentials(res?.data))
  //           axiosInstance.defaults.headers.common['authorization'] = `Bearer ${res?.data?.token}`
  //           return axiosInstance(prevRequest)
  //         }).catch(error => {
  //         return axiosInstance(prevRequest)
  //       })
  //     }
  //   }
  // )

  }, [])

  return (
    <div className="App ">
      <Router>
        {/* <input type={'week'} onChange={(e) => {
          console.log(e.target.value)
        }} /> 
         <Link className='text-black h-6 w-full block'
          state={{ user: {name: "Modou Mbye", age: 25} }} to={{ pathname: '/articles/add', search: "?modou", hash: "#modou" }} >Add Article</Link> */}
        <Navbar activeNavLink={activeNavLink} />
        <Routes>
          <Route path='/' element={<NewsRoom setActiveNavLink={setActiveNavLink} />} />
          {/* <Route path='/' element={<News setActiveNavLink={setActiveNavLink} />} /> */}
          <Route path='/login' element={<Login setActiveNavLink={setActiveNavLink} />} />
          <Route path='/addarticle' element={<AddArticle setActiveNavLink={setActiveNavLink} />} />
          <Route path='/register' element={<Register setActiveNavLink={setActiveNavLink} />} />
          <Route element={<RequireAuth allowedRoles={["user", "admin", 'editor']} />}>
            <Route path='/profile' element={<UserProfile setActiveNavLink={setActiveNavLink} />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path='/users' element={<Users setActiveNavLink={setActiveNavLink} />} />
            <Route path={`/users/:userId`} element={<EditUser setActiveNavLink={setActiveNavLink} />} />
          </Route>
          {/* <Route element={<RequireAuth allowedRoles={["admin", 'editor']} />}> */}
          {/* </Route> */}
          <Route path='/:id' element={<ArticlePage setActiveNavLink={setActiveNavLink} />} />
          <Route element={<RequireAuth allowedRoles={["admin"]} />} >
          <Route path='school'>
            <Route index element={<School />} />
            <Route path='add' element={<AddSchool />} />
            <Route path=':id' element={<EditSchool />} />
          </Route>
        </Route>
        <Route path='/sports'
          element={<SportsNews setActiveNavLink={setActiveNavLink} />}
        />
        <Route path='/utg-management' element={<ManagementNews setActiveNavLink={setActiveNavLink} />} />
        <Route path='/utg-su' element={<UTGSUNews setActiveNavLink={setActiveNavLink} />} />
        {/* <Route path='/profile' element={<UserProfile setActiveNavLink={setActiveNavLink} />} />
          <Route path='articles'>
            <Route index element={<News setActiveNavLink={setActiveNavLink} />} />
            <Route path='add' element={<AddArticle setActiveNavLink={setActiveNavLink} />} />
            <Route path=':articleId' element={<EditArticle setActiveNavLink={setActiveNavLink} />} />
          </Route> */}

        <Route path='*' element={"Not Found Page"} />
      </Routes>
      {/* <Route path='/e' element={<NewsRoom />} /> */}
    </Router>

    </div >
  );
}


export default App;
