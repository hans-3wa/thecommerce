import {Register} from "../pages/auth/register";
import {Dashboard} from "../pages/dashboard/dashboard";
import {Logout} from "../pages/auth/logout";
import {Login} from "../pages/auth/login";

const publicRoutes = [
    {path: "/register", component: <Register/>},
    {path: "/login", component: <Login/>},
    {path: "/logout", component: <Logout/>},
]

const privateRoutes = [
    {path: "/dashboard", component: <Dashboard/>}
]


export {privateRoutes, publicRoutes}