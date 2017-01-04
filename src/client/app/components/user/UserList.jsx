import React from 'react';
import Strings from '../../helpers/Strings.js';
import Ajax from '../../helpers/Ajax.js';
import Dom from '../../helpers/Dom.js';

import UserItem from './UserItem.jsx';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateData = this.updateData.bind(this);
        this.add = this.add.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    updateData () {
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

    add () {
        Dom.addClass(document.body,'form-open');
        this.props.loadForm({formType: 'user'});
    }

    componentDidMount () {
        this.updateData();
    }

    componentWillReceiveProps(nextProps) {
        this.updateData();
    }

    renderUsers () {
        var self = this;
        var users = [];
        if(this.state.users){
            this.state.users.forEach(function(user){
                users.push(
                    <UserItem user={user} key={user.id} loadForm={self.props.loadForm} update={self.props.update}/>
                );
            });
        }
        return users;
    }

    render() {
        return (
            <div>
                <a onClick={this.add}>add</a>
                <div className="user-list">
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
}

export default UserList;
