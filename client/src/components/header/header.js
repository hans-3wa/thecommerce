import {BiUser} from "react-icons/bi/"
import {Title} from "../title/Title";
import './styles.scss'
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

export const Header = () => {

    const [authActive, setAuthActive] = useState(false)

    return (
        <header>
            <div className="title">
                <Title type={"h2"} content={"Thépaspret"}/>
            </div>
            <div className="auth">
                <BiUser onClick={() => setAuthActive(!authActive)}/>
                {authActive && (
                    <div className="auth-active">
                        <ul>
                            <li><Link to={"/register"}>S'inscrire</Link></li>
                            <li><Link to={"/login"}>Se connecter</Link></li>
                            <li><Link to={"/logout"}>Déconnexion</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}