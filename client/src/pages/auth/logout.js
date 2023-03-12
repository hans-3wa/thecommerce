import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {deleteUser} from "../../store/slices/user/userSlice";

export const Logout = () => {
    const navigate = useNavigate()
    const dispacth = useDispatch()
    useEffect(() => {
        localStorage.removeItem('jwt')
        dispacth(deleteUser())
        navigate("/")
    }, [navigate])

    return null;
}