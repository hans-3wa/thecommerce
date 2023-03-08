import {Title} from "../../components/title/Title";
import {Row} from "../../common/row/row";
import {Col} from "../../common/col/col";
import {Header} from "../../components/header/header";

export const Home = () => {
    return (
        <>
            <Row>
                <Col length={12}>
                    <Title type={"h1"} content={"Thé pas pret, votre boutique de thé en ligne"}/>
                </Col>
            </Row>
        </>
    )
}