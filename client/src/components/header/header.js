import {BiUser} from "react-icons/bi/"
import {Title} from "../title/Title";
import './styles.scss'
import {Link} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";

export const Header = () => {

    const [authActive, setAuthActive] = useState(false)

    const {user} = useSelector(state => state)
    console.log(user)
    return (
        <header>
            <div className="title">
                <Link to={"/"}><Title type={"h2"} content={"Thépaspret"}/></Link>
            </div>
            <div className="auth">
                <BiUser onClick={() => setAuthActive(!authActive)}/>
                {authActive && (
                    <div className="auth-active">
                        <ul>
                            {user.isAdmin && (
                                <li><Link to={"/admin"} onClick={() => (setAuthActive(false))}>Administration</Link>
                                </li>
                            )}
                            {user.isLogged ? (
                                <li><Link to={"/logout"} onClick={() => (setAuthActive(false))}>Déconnexion</Link></li>
                            ) : (
                                <>
                                    <li><Link to={"/register"} onClick={() => (setAuthActive(false))}>S'inscrire</Link>
                                    </li>
                                    <li><Link to={"/login"} onClick={() => (setAuthActive(false))}>Se connecter</Link>
                                    </li>
                                </>
                            )}


                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}