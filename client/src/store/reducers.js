import {combineReducers} from "redux";
import userSlice from "./slices/user/userSlice";
import productSlice from "./slices/user/productSlice";

const rootReducer = combineReducers({
    user: userSlice,
    products: productSlice
})


export default rootReducer
