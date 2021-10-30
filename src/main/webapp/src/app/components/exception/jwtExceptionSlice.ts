import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../../config/axios-interceptor";

export interface JwtExceptionState {
  time: string,
  status: string,
  message: string,
  isError: boolean,
}

const initialState: JwtExceptionState = {
  time: '',
  status: '',
  message: '',
  isError: false,
}

export const jwtReIssueAsync = createAsyncThunk('jwt/reIssue', async (params: any, thunkAPI: any) => {
  try {
    return await http.post('/auth/re-issue', params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
})

export const jwtExceptionSlice = createSlice({
  name: 'jwtException',
  initialState,
  reducers: {
    setError: (state: JwtExceptionState, action: any) => {
      const {time, status, message} = action.payload;
      state.isError = true;
      state.time = time;
      state.status = status;
      state.message = message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(jwtReIssueAsync.pending, (state, action) => {

      })
      .addCase(jwtReIssueAsync.fulfilled, (state, action) => {
        const {accessToken, refreshToken} = action.payload;

        // member store accessToken, refreshToken 변경


        http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        return initialState;
      })
      .addCase(jwtReIssueAsync.rejected, (state, action) => {
        state.message = '재로그인이 필요합니다.';
      })
  }
})

export const { setError } = jwtExceptionSlice.actions;