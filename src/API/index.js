// import UseAuth from '../features/Auth/UseAuth'
// import {useDispatch} from 'react-redux'
import {store} from '../app/store'
import axios from "axios";
import { setCredentials} from '../features/Auth/AuthSlice';
const token = store?.getState()?.auth?.token;
// console.dir(store)
const url = 'http://localhost:6001';
// const dispatch = useDispatch()
// const config ={headers: {'authorization': `Bearer ${token}`}}
// export const fetchArticles =()=> axios.get(`${url}+ "/articles"`);
// export const getArticlesForSchool = (id, token) => axios.get(`${url}/articles/${id}/school`)
// export const getArticleForCategory = category => axios.get(`${url}/category/${category}`)
// export const deleteArticle =(id, token)=> axios.delete(`${url}/articles/${id}`, {headers: {'authorization': `Bearer ${token}`}})
// export const createArticle =(newArticle, token)=> axios.post(`${url}+ "/articles"`, newArticle,{headers: {'content-type': "multipart/form-data", 'authorization':`Bearer ${token}`}})
// export const updateArticle = (token, article, id) => axios.post(`${url}+ "/articles/"${id}`, article, { headers: { 'content-type': "multipart/form-data", 'authorization': `Bearer ${token}` } })

export const axiosInstance = axios.create( {baseURL: url});
axiosInstance.interceptors.request.use(
    function (req) {
        console.log(token);
        req.headers["authorization"] = `Bearer ${token}`
        console.log(req?.headers['authorization']);
        return req
    },
   function (err) {
        return Promise.reject(err)
    }
)

// axiosInstance.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         console.log(err);
//         const originalRequest = err?.config;
//         console.log(originalRequest);
//         if (err?.response?.status === 401 || !originalRequest?._retry) {
//            try {
//                 const res = await axiosInstance.get(`/auth/refresh`);
//                 store.dispatch(setCredentials(res?.data));
//                 axiosInstance.defaults.headers.common['authorization'] =
//                    'Bearer ' + res?.data?.token;
//                return axiosInstance(originalRequest)
//             } catch (error) {
//                 return await Promise.reject(error);
//             }
//         }
//       return Promise.reject(err)  
//     }
// )



export default axiosInstance;