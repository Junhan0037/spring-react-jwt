import {combineReducers} from "redux";
import counterSlice from "../components/counter/counterSlice";
import {memberSlice} from "../components/member/memberSlice";
import {jwtExceptionSlice} from "../components/exception/jwtExceptionSlice";

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  member: memberSlice.reducer,
  jwtException: jwtExceptionSlice.reducer,
})

export default rootReducer;