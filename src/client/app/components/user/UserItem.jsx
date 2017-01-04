import React from 'react';
import Strings from '../../helpers/Strings.js';

class UserItem extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
    }

    render() {
        return (
            <div className="user-item">
                <div className="name">{this.user.name}</div>
                <div className="email">{this.user.email}</div>
                <div className="password">{this.user.password}</div>
                <div className="role">{this.user.role}</div>
            </div>
        )
    }
}

export default UserItem;
