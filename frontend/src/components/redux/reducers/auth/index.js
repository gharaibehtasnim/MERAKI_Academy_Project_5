import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",

  initialState: {
    token: null || localStorage.getItem("token"),
    userId: null || localStorage.getItem("userId"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", state.token);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    setLogout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.userId = null;
      localStorage.clear();
    },
    // deletePost:(state,action)=>{

    //     state.posts.forEach((post,idx)=>{
    //         if(post.id===action.payload)
    //         {
    //             state.posts.splice(idx,1)
    //         }
    //     })
    // },
  },
});
export const { setLogin, setUserId, setLogout } = auth.actions;

export default auth.reducer;
