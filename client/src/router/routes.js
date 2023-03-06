import {Register} from "../pages/auth/register";
import {Dashboard} from "../pages/dashboard/dashboard";
import {Logout} from "../pages/auth/logout";
import {Login} from "../pages/auth/login";
import {Admin} from "../pages/admin/admin";

const publicRoutes = [
    {path: "/register", component: <Register/>},
    {path: "/login", component: <Login/>},
    {path: "/logout", component: <Logout/>},
]

const privateRoutes = [
    {path: "/dashboard", component: <Dashboard/>},
]

const adminRoutes = [
    {path: "/admin", component: <Admin/>}
]


export {privateRoutes, publicRoutes, adminRoutes}