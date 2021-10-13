import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../../config/axios-interceptor";

export interface memberState {
  email: string,
  status: string,
}

const initialState: memberState = {
  email: '',
  status: 'idle',
}

export const signUpAsync = createAsyncThunk('member/signUp', async (params: any, thunkAPI: any) => {
  try {
    return await http.post('/auth/sign-up', params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
})

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    login: (state, action) => {

    },
    logout: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        const {email} = action.payload;
        state.email = email;
        state.status = 'idle';
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = 'error';
      })
  }
})

export const { login, logout } = memberSlice.actions;
