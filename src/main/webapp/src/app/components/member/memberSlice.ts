import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../../config/axios-interceptor";

export interface memberState {
  name: string,
  email: string,
  status: string,
  isLogin: string,
  error: any,
  accessToken: string,
  refreshToken: string,
  searchAssistant: string[],
}

const initialState: memberState = {
  name: '',
  email: '',
  status: 'idle',
  isLogin: '',
  error: [],
  accessToken: '',
  refreshToken: '',
  searchAssistant: [],
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

export const registerAsync = createAsyncThunk('member/register', async (params: any, thunkAPI: any) => {
  try {
    return await http.post('/auth/register');
  } catch (e: any) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
})

export const searchAssistantAsync = createAsyncThunk('member/register/search', async (params: any, thunkAPI: any) => {
  try {
    return await http.post('/auth/register/search', params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
})

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.status = 'idle';
      state.isLogin = 'idle'
      state.error = [];
      state.accessToken = '';
      state.refreshToken = '';
      state.searchAssistant = [];
    },
    clearSearchAssistant: (state) => {
      state.searchAssistant = [];
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
        state.isLogin = 'loginLoading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLogin = 'loginSuccess';
        state.accessToken = action.payload['accessToken'];
        state.refreshToken = action.payload['refreshToken'];
        state.name = action.payload['name'];
        state.email = action.payload['email'];
      })
      .addCase(loginAsync.rejected, (state, action: any) => {
        state.isLogin = 'loginError';
      })

      .addCase(registerAsync.pending, (state, action) => {
        state.status = 'registerLoading';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'registerSuccess';
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'registerError';
      })

      .addCase(searchAssistantAsync.pending, (state, action) => {
        state.status = 'searchLoading';
      })
      .addCase(searchAssistantAsync.fulfilled, (state, action) => {
        state.status = 'searchSuccess';
        state.searchAssistant = action.payload;
      })
      .addCase(searchAssistantAsync.rejected, (state, action) => {
        state.status = 'searchError';
      })
  }
})

export const { logout, clearSearchAssistant } = memberSlice.actions;
