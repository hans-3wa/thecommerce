import './styles.scss';
export const Row = (props) => {
    return (
        <>
            <div className="row">
                {props.children}
            </div>
        </>
    )
}