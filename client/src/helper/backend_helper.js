import {post, get} from "./api_helper";
import {ADMIN_GET_PRODUCT, ADMIN_GET_PRODUCT_SLUG, LOGIN, REGISTER, VERIFY_TOKEN} from "./url_helper";

export const postLogin = (data) => post(LOGIN, data)

export const postRegister = (data) => post(REGISTER, data)

export const getVerifyToken = () => get(VERIFY_TOKEN)

export const getAdminProducts = () => get(ADMIN_GET_PRODUCT)

export const getAdminProductSlug = (slug) => get(`${ADMIN_GET_PRODUCT_SLUG}/${slug}`)
