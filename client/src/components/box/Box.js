import './styles.scss'

export const Box = (props) => {
    return(
        <>
            <div className="box">
                {props.children}
            </div>
        </>
    )
}