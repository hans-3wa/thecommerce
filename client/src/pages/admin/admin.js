import {useSelector} from "react-redux";
import {Row} from "../../common/row/row";
import {Col} from "../../common/col/col";
import {Box} from "../../components/box/Box";
import {useState, useEffect} from "react";
import './styles.scss'
import {getAdminProducts} from "../../helper/backend_helper";
import {Link} from "react-router-dom";

export const Admin = () => {
    const [products, setProducts] = useState([])

    const {user} = useSelector(state => state)

    useEffect(() => {
        getAdminProducts()
            .then((data) => setProducts(data.products))
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <Row>
                <Col length={6}>
                    <Box>
                        <h1>Bonjour {user.email}</h1>
                    </Box>
                </Col>
            </Row>
            <Row>
                <Col length={10}>
                    <Box>
                        <h1>Modifier les produits</h1>

                        <table className="tftable">
                            <thead>
                            <tr>
                                <th>Nom du produit</th>
                                <th>Quantité</th>
                                <th>Prix</th>
                                <th>Visible</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td><Link to={`/admin/product/${e.slug}`}>{e.name}</Link></td>
                                        <td>{e.quantity}</td>
                                        <td>{e.price}</td>
                                        <td>{e.status ? "Oui" : "Non"}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </Box>
                </Col>
            </Row>
        </>
    )
}