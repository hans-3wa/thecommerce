import './styles.scss';
import PropTypes from "prop-types";


export const Col = (props) => {
    return (
        <>
            <div className={'col col-'+String(props.length)}>
                    {props.children}
            </div>
        </>
    )
}

Col.propTypes = {
    length: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]).isRequired,
}