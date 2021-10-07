import {combineReducers} from "redux";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import userSlice from "../components/member/user";

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>