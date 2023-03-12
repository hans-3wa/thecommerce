import {Title} from "../../components/title/Title";
import {Row} from "../../common/row/row";
import {Col} from "../../common/col/col";
import {Box} from "../../components/box/Box";
import {Separator} from "../../common/separator/separator";
import {ButtonPrimary} from "../../components/buttons/buttonPrimary";
import './styles.scss'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/slices/user/productSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.productsVisible)
    const navigate = useNavigate()

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts())
        }
    }, [])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const handleDetail = (e, product) => {
        navigate(`/product/${product.slug}`)
    }
    return (
        <>
            <div className="home">
                <Row>
                    <Col length={12}>
                        <div className="title">
                            <Title type={"h1"} content={"Thé pas pret"}/>
                            <p><i>Venez découvrir notre boutique en ligne, tous nos thé sont d'origine bio</i></p>
                        </div>
                    </Col>
                </Row>
                <div className="sub-title">
                    <Title type={"h2"} content={"Nos produits phares"}/>
                    <Separator/>
                </div>
                <Row>
                    {products.map((product, i) => {
                        return (
                            <Col length={4} key={i}>
                                <Box class={"cart"} handleClick={(event) => handleDetail(event, product)}>
                                    <Title type={"h3"} content={product.name}/>
                                    <Separator/>
                                    <p>{product.description}</p>
                                    <div className="cart-img">
                                        <Slider {...settings}>
                                            {product.images && (
                                                product.images.map((e, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <img src={`http://localhost:5300/${e}`}
                                                                 alt={product.name}/>
                                                        </div>
                                                    )
                                                })
                                            )}
                                        </Slider>
                                    </div>
                                    <div className="cart-item">
                                        <ul>
                                            <li>Nom: {product.name}</li>
                                            <li>Prix: {product.price}</li>
                                            <li>Disponible: {product.quantity >= 1 ? "oui" : "non"}</li>
                                        </ul>
                                    </div>
                                    <div className="action">
                                        <ButtonPrimary type={"button"}
                                                       handleClick={() => console.log('detail')}>Ajouter</ButtonPrimary>
                                    </div>
                                </Box>
                            </Col>
                        )
                    })}
                </Row>
            </div>

        </>
    )
}