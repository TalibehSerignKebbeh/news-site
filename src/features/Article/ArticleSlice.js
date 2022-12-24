import { createSlice } from "@reduxjs/toolkit";


const ArtilceSlice = createSlice({
    name: "Article",
    initialState: { title: null },
    reducers: {
        setTitleToSearch: (state, action) => {
            const { title } = action.payload;
            state.title = title;
        }
    }
})


export default ArtilceSlice.reducer;
export const { setTitleToSearch } = ArtilceSlice.actions;

export const title = (state)=>state?.Article?.title