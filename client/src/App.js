import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {privateRoutes, publicRoutes} from "./router/routes";
import {Authmiddleware} from "./router/AuthMiddleware";
import {getVerifyToken} from "./helper/backend_helper";
import {addUser} from "./store/slices/user/userSlice";


function App() {

    const {user} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('app')
        if(localStorage.getItem('jwt') && !user.isLogged){
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
    }, [])


    return (
        <Routes>
            {publicRoutes.map((route, i) => (
                <Route path={route.path} element={route.component} key={i} exact={true}/>
            ))}
            {privateRoutes.map((route, idx) => (
                <Route path={route.path} element={
                    <Authmiddleware>
                        {route.component}
                    </Authmiddleware>}
                       key={idx}
                       exact={true}
                />
            ))}
        </Routes>
    );
}

export default App;
