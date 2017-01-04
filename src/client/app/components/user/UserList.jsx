import React from 'react';
import Strings from '../../helpers/Strings.js';
import Ajax from '../../helpers/Ajax.js';

import UserItem from './UserItem.jsx';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderUsers = this.renderUsers.bind(this);
    }

    updateData (after) {
        this.setState({data: undefined});
        return Ajax.user.getAll()
        .then((response) => response.json())
        .then((data) => {
            // this.state.failed = false;
            this.state.users = data;
            this.setState(this.state);
        }).catch((data) => {
            // this.state.failed = true;
            this.state.users = [];
            this.setState(this.state);
        });
    }

    componentDidMount () {
        this.updateData();
    }

    renderUsers () {
        var users = [];
        if(this.state.users){
            this.state.users.forEach(function(user){
                users.push(
                    <UserItem user={user} key={user.id}/>
                );
            });
        }
        return users;
    }

    render() {
        return (
            <div className="user-list">
                {this.renderUsers()}
            </div>
        );
    }
}

export default UserList;
