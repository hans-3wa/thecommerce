import {combineReducers} from "redux";
import userSlice from "./slices/user/userSlice";

const rootReducer = combineReducers({
    user: userSlice
})


export default rootReducer
