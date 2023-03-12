import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addProductView, fetchProductSlug} from "../../store/slices/user/productSlice";
import {ButtonPrimary} from "../../components/buttons/buttonPrimary";
import {Col} from "../../common/col/col";
import {Title} from "../../components/title/Title";
import {Separator} from "../../common/separator/separator";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Box} from "../../components/box/Box";
import './styles.scss'

export const Product = () => {
    const [product, setProduct] = useState({})
    const {slug} = useParams();
    const dispatch = useDispatch()
    const {products} = useSelector(state => state)

    useEffect(() => {
        if (products.productsVisible.length > 0) {
            dispatch(addProductView(slug))
        } else {
            dispatch(fetchProductSlug(slug))
        }
    }, [])

    useEffect(() => {
        setProduct(products.productSlug)
    }, [products])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <Col length={4}>
                <Box class={"cart"}>
                    <Title type={"h3"} content={product.name ? product.name : ""}/>
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
                        <ButtonPrimary type={"button"} handleClick={() => console.log('detail')}>Ajouter</ButtonPrimary>
                    </div>
                </Box>
            </Col>
        </>
    )
}