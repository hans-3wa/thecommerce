import './styles.scss'
import {Header} from "../../components/header/header";
import {Footer} from "../../components/footer/footer";
export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className="layout">
                {children}
            </div>
            <Footer/>
        </>
    )
}