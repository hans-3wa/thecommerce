import {Form} from "../../components/form/Form";
import {Row} from "../../common/row/row";
import {Col} from "../../common/col/col";
import {Title} from "../../components/title/Title";
import './styles.scss';
import {InputForm} from "../../components/form/InputForm";
import {useState} from "react";
import {postLogin} from "../../helper/backend_helper";
import {useDispatch} from "react-redux";
import {addUser} from "../../store/slices/user/userSlice";
import {useNavigate} from "react-router-dom";
import {toastError} from "../../components/toast/toast";


export const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        postLogin({email, password})
            .then(response => {
                dispatch(addUser(response))
                localStorage.setItem("jwt", response.jwt)
                navigate("/dashboard")
            })
            .catch((err) => {
                toastError('Identifiants incorrect')
            })
    }

    return (
        <Row>
            <Col length={12}>
                <Title type={"h1"} content={"Login"}/>
            </Col>
            <Col length={10}>
                <div className={"form-register"}>
                    <Form titleSubmit={"Inscription"} handleSubmit={handleSubmit} btnSubmit>
                        <InputForm handleChange={(e) => setEmail(e.target.value)} label={"Email"} type={"email"}/>
                        <InputForm handleChange={(e) => setPassword(e.target.value)} label={"Mot de passe"}
                                   type={"password"}/>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}