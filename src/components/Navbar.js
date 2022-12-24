import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imgsrc from '../img/news-logo.png'
// import { format } from 'date-fns'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import UseAuth from '../features/Auth/UseAuth';
import axios from 'axios';
import { api_url } from '../app/index';
import { useDispatch } from 'react-redux';
import { resetCredentials } from '../features/Auth/AuthSlice';

const Navbar = ({ activeNavLink }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user,token, isAdmin, isEditor} = UseAuth();
    const navLinks =useMemo(()=> [{ 'name': "home", 'to': '/', "viewOnLogin": 'true',"EditorMode": "false", "AdminMode": 'false' },
    { 'name': "utg su", 'to': 'utg-su', "viewOnLogin": 'true',"EditorMode": "false", "AdminMode": 'false' },
    { 'name': 'sports', 'to': "sports", "viewOnLogin": 'true', "EditorMode": "false", "AdminMode": 'false' },
    { 'name': 'management', 'to': 'utg-management', "viewOnLogin": 'true', "EditorMode": "false", "AdminMode": 'false' },
    { "name": "login", "to": "login", "viewOnLogin": 'false',"EditorMode": "false", "AdminMode": 'false' },
        { "name": "register", "to": "register", "viewOnLogin": 'false', "EditorMode": "false", "AdminMode": 'false' },
        { "name": "AddArtcile", "to": "addarticle", "viewOnLogin": 'true', "EditorMode": "true", "AdminMode": 'true' }], []);
    const adminNavlinks = [{ 'name': "home", 'to': '/' }, { 'name': "utg su", 'to': 'utg-su' },
        { 'name': 'sports', 'to': "sports" }, { 'name': 'management', 'to': 'utg-management'}, {"name": "users", "to": "users"} ,{ "name": "AddArtcile", "to": "addarticle"}
    ]
    const userNavLins = [{ 'name': "home", 'to': '/', "viewOnLogin": 'true',"EditorMode": "false", "AdminMode": 'false' },
    { 'name': "utg su", 'to': 'utg-su', "viewOnLogin": 'true',"EditorMode": "false", "AdminMode": 'false' },
    { 'name': 'sports', 'to': "sports", "viewOnLogin": 'true', "EditorMode": "false", "AdminMode": 'false' },
    { 'name': 'management', 'to': 'utg-management', "viewOnLogin": 'true', "EditorMode": "false", "AdminMode": 'false' }]
    const editorsNavLinks = [{ 'name': "home", 'to': '/' }, { 'name': "utg su", 'to': 'utg-su' },
        { 'name': 'sports', 'to': "sports" }, { 'name': 'management', 'to': 'utg-management'}, { "name": "AddArtcile", "to": "addarticle"},]
    const [navLinsToSee, setnavLinsToSee] = useState([]);
    const [loggingOut, setloggingOut] = useState(false);
    const [activeMenu, setactiveMenu] = useState(false);
    useEffect(() => {
        if (isAdmin) setnavLinsToSee(adminNavlinks)
         else if(isEditor) {
            setnavLinsToSee(editorsNavLinks)
        } else if(user){
           setnavLinsToSee(userNavLins) 
        }else {setnavLinsToSee(navLinks?.filter(navlink =>
                (navlink?.AdminMode === "false" ) ? navlink : null))}
    }, [ editorsNavLinks, isAdmin, isEditor,  user])

    const handleLogout = async () => {
        console.log("logout btn");
        setloggingOut(true)
        await axios.post(api_url + "/auth/logout", {Headers: {"authorization": `Bearer ${token}`}})
            .then(res => {
                console.log(res);
                dispatch(resetCredentials())
                setloggingOut(false)
                navigate('/')
                console.log("Logout complete");

            })
            .catch(err => {
                console.log(err);
                setloggingOut(false)
                console.log("Error  occured");

            })
        console.log("what so ever happened");
    }
    return (
        <div className='w-full overflow-x-hidden md:overflow-hidden md:h-32 h-24 bg-white shadow relative flex flex-col items-center justify-between'>
            <div className='w-full md:h-2/5 flex md:flex-row flex-col flex-wrap md:justify-between justify-center items-start m-auto'>
                <div className='w-auto py-3 text-center my-auto md:pt-7 md:m-auto md:ml-4 md:mr-auto ml-11 mr-auto'>
                    <img src={imgsrc} alt='' className='w-8 h-8 mr-auto md:ml-14 m-auto  rounded-lg' />
                    <p className='text-orange-600 font-semibold md:text-lg text-sm italic md:mr-auto md:ml-4 md:mb-auto block capitalize md:py-3 m-auto '>
                        UTG Online News
                        {/* , {format(new Date(), "MMMM do yyyy")} */}
                    </p>
                </div>
                {/* social media links */}
                <div className='w-28 flex flex-row items-center justify-evenly gap-1 md:mx-6 mx-9 md:mb-0 mb-2'>
                    <a href='https://twitter.com'><FaTwitter className='text-blue-500 md:w-6 w-3 md:h-6 h-3' /></a>
                    <a href='https://facebook.com'><FaFacebook className='text-blue-800 md:w-6 w-3 md:h-6 h-3' /></a>
                    <a href='https://twitter.com'><FaInstagram className='text-red-700 md:w-6 w-3 md:h-6 h-3' /></a>
                    <a href='https://youtube.com'><FaYoutube className='text-red-800 md:w-6 w-3 md:h-6 h-3' /></a>
                </div>
            </div>
            <button onClick={() => setactiveMenu(prev => !prev)} id='opener'
                className='md:invisible visible float-right fixed top-1 right-2 px-3 text-3xl text-black font-extrabold'>&#9776;</button>
            <div className={`${(activeMenu) ? " nav-links-main-wrapper active" : " nav-links-main-wrapper"} '} id='ul-wrapper`}>
                <button onClick={() => setactiveMenu(prev => !prev)} id='closer'
                    className='md:invisible visible float-right absolute top-2 right-2 px-3 text-3xl text-white font-extrabold'>&times;</button>

                <ul className='md:divide-x-4 md:flex md:flex-row justify-center  items-center text-center py-3 ' id='links-ul'>
                    {navLinsToSee?.map((navlink, id) => (
                        <li key={id} id={`${(activeNavLink === navlink?.name) ? 'active-menu' : ''}`}
                            className={` w-auto mx-2 pl-3 m-auto text-center py-1 capitalize`}
                        >
                            <Link to={navlink?.to} >{navlink?.name}</Link>
                        </li>

                    ))}
                    {user ? <button type='submit'
                        onClick={handleLogout}
                        className={` hover:shadow w-auto mx-2 m-auto text-center uppercase bg-gray-200 px-2 py-2 rounded-md`}
                    >
                        {loggingOut? "Loading..." :'Logout'}
                    </button> : null}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
