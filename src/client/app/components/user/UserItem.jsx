import React from 'react';
import Strings from '../../helpers/Strings.js';
import Dom from '../../helpers/Dom.js';
import Ajax from '../../helpers/Ajax.js';

class UserItem extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    edit () {
        Dom.addClass(document.body,'form-open');
        this.props.loadForm({user: this.props.user, formType: 'user'});
    }

    delete () {
        return Ajax.user.delete(this.props.user)
            .then((response) => response.json())
            .then((data) => {
                this.setState({user: data});
                this.props.update();
            }).catch((data) => {
                this.setState({user:this.defaultUser});
            });
    }

    render() {
        return (
            <div className="item user-item">
                <div className="name">{this.props.user.name}</div>
                <div className="email">{this.props.user.email}</div>
                {/* <div className="password">{this.user.password}</div> */}
                {/* <div className="role">
                    {this.props.user.role === 1 ? 'Admin' : 'Normal User'}
                </div> */}
                <a onClick={this.edit}>edit</a>
                &nbsp;
                <a className="delete" onClick={this.delete}>delete</a>
            </div>
        )
    }
}

export default UserItem;
