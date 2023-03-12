import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAdminProductSlug} from "../../../helper/backend_helper";
import {Row} from "../../../common/row/row";
import {Col} from "../../../common/col/col";
import {InputForm} from "../../../components/form/InputForm";
import {Form} from "../../../components/form/Form";
import {Box} from "../../../components/box/Box";
import './styles.scss'

export const AdminProduct = () => {
    const {slug} = useParams();

    const [product, setProduct] = useState({})

    useEffect(() => {
        getAdminProductSlug(slug)
            .then((product) => setProduct(product))
            .catch((err) => console.log(err))
    }, [slug])

    const handleChange = (e) => {
        const {name} = e.target
        console.log(name)
        setProduct({...product, [e.name]: e.value})
    }
    return (
        <>
            <Row>
                <Col length={10}>
                    <h1>Modifier : {product.name}</h1>
                </Col>
            </Row>
            <Row>
                <Col length={6}>
                    <Box>
                        <Form titleSubmit={"Inscription"} handleSubmit={() => console.log('ok')} btnSubmit>
                            <InputForm handleChange={handleChange} label={"Nom"} name={"name"} type={"text"}
                                       value={product.name}/>
                            <InputForm handleChange={handleChange} label={"Description"} name={"description"}
                                       type={"text"} value={product.description}/>
                            <InputForm handleChange={handleChange} label={"Quantité"} name={"quantity"} type={"text"}
                                       value={product.quantity}/>
                            <InputForm handleChange={handleChange} label={"Prix"} name={"price"} type={"number"}
                                       value={product.price}/>
                            <input onChange={(e) => setProduct({...product, status: e.target.checked})} name={"status"}
                                   type={"checkbox"}/>
                            <div className={"form-img"}>
                                {product.images ? product.images.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            <p>ok</p>
                                            <img src={`http://localhost:5300/${e}`} alt=""/>
                                        </div>
                                    )
                                }) : null}
                            </div>
                        </Form>
                    </Box>
                </Col>
            </Row>
        </>
    )
}