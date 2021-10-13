import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import fetchCount from "./counterAPI";

export interface counterState {
  value: number,
  status: string,
}

const initialState: counterState = {
  value: 0,
  status: 'idle',
}

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
  const response: any = await fetchCount(amount);
  return response.data;
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {});
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: any) => state.counter.value;

export const incrementIfOdd = (amount: any) => (dispatch: any, getState: any) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
}

export default counterSlice