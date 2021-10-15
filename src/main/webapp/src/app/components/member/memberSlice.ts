import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../../config/axios-interceptor";

export interface memberState {
  email: string,
  status: string,
  error: any,
  accessToken: string,
  refreshToken: string,
}

const initialState: memberState = {
  email: '',
  status: 'idle',
  error: [],
  accessToken: '',
  refreshToken: '',
}

export const signUpAsync = createAsyncThunk('member/signUp', async (params: any, thunkAPI: any) => {
  try {
    return await http.post('/auth/sign-up', params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
})

export const loginAsync = createAsyncThunk('member/login', async (params: any, thunkAPI: any) => {
  try {
    return await http.post('/auth/login', params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
})

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    logout: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state, action) => {
        state.status = 'signUpLoading';
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = 'signUpSuccess';
      })
      .addCase(signUpAsync.rejected, (state, action: any) => {
        state.error = [];
        state.status = 'signUpError';
        const errors = action.payload;
        errors.forEach((error: any) => {
          const {defaultMessage, field} = error;
          state.error = [...state.error, {defaultMessage, field}];
        })
      })

      .addCase(loginAsync.pending, (state, action) => {
        state.status = 'loginLoading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'loginSuccess';
        state.accessToken = action.payload['accessToken'];
        state.refreshToken = action.payload['refreshToken'];
      })
      .addCase(loginAsync.rejected, (state, action: any) => {
        state.status = 'loginError'
      })
  }
})

export const { logout } = memberSlice.actions;
