import React from 'react';
import Strings from '../../helpers/Strings.js';

import UserForm from '../user/UserForm.jsx';
import TaskForm from '../task/TaskForm.jsx';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formData: this.props.formData};
        this.closeForm = this.closeForm.bind(this);
        this.renderFormWithData = this.renderFormWithData.bind(this);
    }

    closeForm () {
        this.props.closeForm();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({formData: nextProps.formData});
    }

    renderFormWithData () {
        if(this.state.formData){
            if(this.state.formData.formType === 'user'){
                return (
                    <div><UserForm user={this.state.formData.user} update={this.props.update}></UserForm></div>
                );
            }else if(this.state.formData.formType === 'task'){
                return (
                    <div><TaskForm task={this.state.formData.task} update={this.props.update}></TaskForm></div>
                );
            }
        }else{
            return (
                <span>No form loaded.</span>
            );
        }
    }

    render() {
        return (
            <div className="form">
                <div className="form-icon" onClick={this.closeForm}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                {this.renderFormWithData()}
            </div>
        )
    }
}

export default Form;
