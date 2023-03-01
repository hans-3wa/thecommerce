import './styles.scss'

export const ButtonSecondary = ({content, handleClick, type}) => {
    return(
        <button type={type} onClick={handleClick} className={"btn btn-secondary"}>{content}</button>
    )
}