import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAdminProductSlug} from "../../../helper/backend_helper";
import {Row} from "../../../common/row/row";
import {Col} from "../../../common/col/col";
import {InputForm} from "../../../components/form/InputForm";
import {Form} from "../../../components/form/Form";
import {Box} from "../../../components/box/Box";

export const AdminProduct = () => {
    const {slug} = useParams();

    const [product, setProduct] = useState({})

    useEffect(() => {
        console.log(slug)
        getAdminProductSlug(slug)
            .then((product) => setProduct(product))
            .catch((err) => console.log(err))
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
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
                            <InputForm handleChange={handleChange} label={"Nom"} name={"name"} type={"text"} value={product.name}/>
                        </Form>
                    </Box>
                </Col>
            </Row>
        </>
    )
}