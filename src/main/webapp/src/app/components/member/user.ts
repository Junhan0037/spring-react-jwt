import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const delay = (time: any, value: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value)
    }, time)
  })

export const user = createAsyncThunk(
    'user',
    async (data: any, thunkAPI) => {
        return await delay(100, data)
    }
)

export interface signUpState {
  email: string,
}

const initialState: signUpState = {
  email: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      submit: (state, action) => action.payload
  },
  extraReducers: builder =>
    builder
      .addCase(user.pending, (state, action) => {})
      .addCase(user.fulfilled, (state: signUpState, action: any) => {})
      .addCase(user.rejected, (state, action) => {})
})

export default userSlice;