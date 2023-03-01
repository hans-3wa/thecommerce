import {post, get} from "./api_helper";
import {LOGIN, REGISTER, VERIFY_TOKEN} from "./url_helper";

export const postLogin = (data) => post(LOGIN, data)

export const postRegister = (data) => post(REGISTER, data)

export const getVerifyToken = () => get(VERIFY_TOKEN)