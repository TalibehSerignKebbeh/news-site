import { apiSlice } from "../../app/api/apiSlice"
import { resetCredentials, setCredentials } from "./AuthSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            // the below is to avoid importing useDispatch and action creators everywhere
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } =  await queryFulfilled
                    console.log(data)
                    dispatch(resetCredentials())
                    setTimeout(() => {
                    dispatch(apiSlice.util.resetApiState())
                    }, 1000);
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),

            // the below is avoid importing useDispatch and action creators everywhere
             async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } =  await queryFulfilled
                    console.log(data)
                    // dispatch(logOut())
                    const { token, user } = data;
                    dispatch(setCredentials({token, user}))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {sendLoginMutation, refresh, sendLogout} = authApiSlice.endpoints