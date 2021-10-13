import {combineReducers} from "redux";
import counterSlice from "../components/counter/counterSlice";
import {memberSlice} from "../components/member/memberSlice";

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  member: memberSlice.reducer,
})

export default rootReducer;