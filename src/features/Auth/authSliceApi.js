import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, resetCredentials } from "./AuthSlice";


export const authSliceApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: '/auth',
                method: "Post",
                body: {...data}
          })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "Post",

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = queryFulfilled
                   console.log(data);
                    dispatch(resetCredentials())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000);
                } catch (error) {
                    console.log(error);
                }
            }
        
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "Post",

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = queryFulfilled
                    const { user, token } = data
                    dispatch(setCredentials({ user, token }))
                } catch (error) {
                    console.log(error);
                }
            }
             
        })
    }),

})


export const {useLoginMutation, useLogoutMutation, useRefreshMutation} = authSliceApi