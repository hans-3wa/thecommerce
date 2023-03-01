import './styles.scss'

export const ButtonPrimary = ({content, handleClick, type}) => {
    return(
        <button type={type} onClick={handleClick} className={"btn btn-primary"}>{content}</button>
    )
}