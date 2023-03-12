import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {adminRoutes, privateRoutes, publicRoutes} from "./router/routes";
import {AuthMiddleware} from "./router/AuthMiddleware";
import {getVerifyToken} from "./helper/backend_helper";
import {addUser} from "./store/slices/user/userSlice";
import {AdminMiddleware} from "./router/AdminMiddleware";
import {Layout} from "./common/layout/layout";

export const App = () => {

    const {user} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem('jwt') && !user.isLogged) {
            getVerifyToken()
                .then(data => {
                    dispatch(addUser(data))
                })
                .catch(() => {
                    localStorage.removeItem('jwt')
                    navigate("/login")
                })
        }
    }, [])
    return (
        <>
            <Routes>
                {publicRoutes.map((route, i) => (
                    <Route path={route.path} element={<Layout>{route.component}</Layout>} key={i} exact={true}/>
                ))}
                {privateRoutes.map((route, idx) => (
                    <Route path={route.path} element={
                        <AuthMiddleware>
                            <Layout>{route.component}</Layout>
                        </AuthMiddleware>}
                           key={idx}
                           exact={true}
                    />
                ))}
                {adminRoutes.map((route, idx) => (
                    <Route path={route.path} element={
                        <AdminMiddleware>
                             <Layout>{route.component}</Layout>
                        </AdminMiddleware>}
                           key={idx}
                           exact={true}
                    />
                ))}
            </Routes>
        </>
    );
}
