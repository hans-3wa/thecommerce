import './styles.scss'
import PropTypes from "prop-types";

export const Form = (props) => {

    return (
        <div className="form-layout">
                <form onSubmit={props.handleSubmit}>
                    {props.children}
                    <div className="form-group">
                        { props.btnSubmit && ( <button type={'submit'}>{props.titleSubmit}</button>)}
                    </div>
                </form>
            </div>
    )
}

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    titleSubmit: PropTypes.string.isRequired,
    btnSubmit: PropTypes.bool
}