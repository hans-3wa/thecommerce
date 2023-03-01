import {useSelector} from "react-redux";
import {useEffect} from "react";

export const Dashboard = () => {
    const {user} = useSelector(state => state)

    useEffect(() => {
        console.log(user)
    }, [user])
    return(
        <>
            <h1>Dashboard</h1>
        </>
    )
}