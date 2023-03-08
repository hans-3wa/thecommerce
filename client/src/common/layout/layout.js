import './styles.scss'
import {Header} from "../../components/header/header";
export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className="layout">
                {children}
            </div>
        </>
    )
}