import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import asyncHook from "../../config/asyncHook";

export interface memberState {
  email: string,
  status: string,
}

const initialState: memberState = {
  email: '',
  status: 'idle',
}

export const signUpAsync = createAsyncThunk('member/signUp', async (data: any, thunkAPI) => {
  console.log('signUpAsync: ', data);
  const response: any = await asyncHook(100, data);
  return response.data;
})

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    signUp: (state, action) => {

    },
    login: (state, action) => {

    },
    logout: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state, action) => {
        console.log('pending: ', state, action);
        state.status = 'loading';
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        console.log('fulfilled: ', state, action);
        const {email} = action.payload;
        state.email = email;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        console.log('rejected: ', state, action);
        state.status = 'error';
      })
  }
})

export const { signUp, login, logout } = memberSlice.actions;
export const selectMember = (state: any) => state.member.email;