import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const signUpThunk = createAsyncThunk('/auth/sign-up', async (data, thunkAPI) => {
  return await axios.post('/auth/sign-up', data);
})

export interface userState {
  email: string,
  isLogin: boolean,
}

const initialState: userState = {
  email: '',
  isLogin: false,
}

const userSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    signUp: (state: any, action: PayloadAction<{ email: string; password: string }>) => {
      console.log(state, action);
      state.email = action.payload.email;
      state.isLogin = true;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(signUpThunk.pending, (state, action) => {})
      .addCase(signUpThunk.fulfilled, (state, action) => {})
      .addCase(signUpThunk.rejected, (state, action) => {}),
})

export default userSlice;
