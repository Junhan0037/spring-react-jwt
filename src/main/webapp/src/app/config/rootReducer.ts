import {combineReducers} from "redux";
import userSlice from "../components/member/user";

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

export default rootReducer;
