import {Form} from "../../components/form/Form";
import {Row} from "../../common/row/row";
import {Col} from "../../common/col/col";
import {Title} from "../../components/title/Title";
import './styles.scss';
import {InputForm} from "../../components/form/InputForm";
import {useState} from "react";
import {postRegister} from "../../helper/backend_helper";
import {useDispatch} from "react-redux";
import {addUser} from "../../store/slices/user/userSlice";
import {Link, useNavigate} from "react-router-dom";


export const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault();
        postRegister({email, password})
            .then(response => {
                localStorage.setItem("jwt", response.jwt)
                dispatch(addUser(response))
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Row>

            <Col length={12}>
                <Title type={"h1"} content={"Inscription"}/>
            </Col>
            <Col length={10}>
                <div className={"form-register"}>
                    <Form titleSubmit={"Inscription"} handleSubmit={handleSubmit} btnSubmit>
                        <InputForm handleChange={(e) => setEmail(e.target.value)} label={"Email"} type={"email"}/>
                        <InputForm handleChange={(e) => setPassword(e.target.value)} label={"Mot de passe"}
                                   type={"password"}/>
                    </Form>
                    <Row>
                        <Col length={12}>
                            <Link style={{textAlign: "center"}} to={"/login"}>Vous avez déja un compte ? </Link>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}