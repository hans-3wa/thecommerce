import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {adminRoutes, privateRoutes, publicRoutes} from "./router/routes";
import {AuthMiddleware} from "./router/AuthMiddleware";
import {getVerifyToken} from "./helper/backend_helper";
import {addUser} from "./store/slices/user/userSlice";
import {AdminMiddleware} from "./router/AdminMiddleware";


function App() {

    const {user} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('jwt') && !user.isLogged) {
            getVerifyToken()
                .then(data => {
                    dispatch(addUser(data))
                })
                .catch(err => {
                    console.log(err)
                    localStorage.removeItem('jwt')
                    navigate("/login")
                })
        }
    }, [dispatch])

    return (
        <Routes>
            {publicRoutes.map((route, i) => (
                <Route path={route.path} element={route.component} key={i} exact={true}/>
            ))}
            {privateRoutes.map((route, idx) => (
                <Route path={route.path} element={
                    <AuthMiddleware>
                        {route.component}
                    </AuthMiddleware>}
                       key={idx}
                       exact={true}
                />
            ))}
            {adminRoutes.map((route, idx) => (
                <Route path={route.path} element={
                    <AdminMiddleware>
                        {route.component}
                    </AdminMiddleware>}
                       key={idx}
                       exact={true}
                />
            ))}
        </Routes>
    );
}

export default App;
