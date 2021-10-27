import {createSlice} from "@reduxjs/toolkit";

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

export const jwtExceptionSlice = createSlice({
  name: 'jwtException',
  initialState,
  reducers: {
    setError: (state: JwtExceptionState, action: any) => {
      console.log('==================');
      console.log(action.payload);
      console.log('==================');
      const {time, status, message} = action.payload;
      state.isError = true;
      state.time = time;
      state.status = status;
      state.message = message;
    },
  }
})

export const { setError } = jwtExceptionSlice.actions;