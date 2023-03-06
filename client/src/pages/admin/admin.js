import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Admin = () => {

    const {user} = useSelector(state => state)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        if(!user.isAdmin){
            navigate("/")
        }
    }, [])
    return(
        <>
            <h1>Admin</h1>
        </>
    )
}