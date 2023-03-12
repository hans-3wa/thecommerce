import {Register} from "../pages/auth/register";
import {Dashboard} from "../pages/dashboard/dashboard";
import {Logout} from "../pages/auth/logout";
import {Login} from "../pages/auth/login";
import {Admin} from "../pages/admin/admin";
import {AdminProduct} from "../pages/admin/adminProduct/adminProduct";
import {Home} from "../pages/home/home";
import {Product} from "../pages/product/product";

const publicRoutes = [
    {path: "/", component: <Home/>},
    {path: "/product/:slug", component: <Product/>},
    {path: "/register", component: <Register/>},
    {path: "/login", component: <Login/>},
    {path: "/logout", component: <Logout/>}
]

const privateRoutes = [
    {path: "/dashboard", component: <Dashboard/>},
]

const adminRoutes = [
    {path: "/admin", component: <Admin/>},
    {path: "/admin/products/:slug", component: <AdminProduct/>},
]


export {privateRoutes, publicRoutes, adminRoutes}