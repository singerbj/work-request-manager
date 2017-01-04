import React from 'react';
import Ajax from '../../helpers/Ajax.js';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.defaultUser = {name:'', email:'', password:'', role: '1'};
        if(props.user && props.user.id){
            this.state = {user: props.user};
            this.getUser(props.user);
        }else{
            this.state = {user: this.defaultUser};
        }
        this.getUser = this.getUser.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.save = this.save.bind(this);
    }

    getUser (user) {
        return Ajax.user.getOne(user)
        .then((response) => response.json())
        .then((data) => {
            this.setState({user: data});
        }).catch((data) => {
            this.setState({user: this.defaultUser});
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.user);
        if(nextProps.user && nextProps.user.id){
            this.setState({user: nextProps.user}, function(){
                this.getUser(nextProps.user);
            });
        }else{
            this.setState({user: this.defaultUser});
        }
    }

    inputChange (event) {
        this.state.user[event.currentTarget.name] = event.currentTarget.value;
        this.setState(this.state);
    }

    save () {
        var key = 'save';
        if(this.state.user.id){
            key = 'update';
        }
        return Ajax.user[key](this.state.user)
            .then((response) => response.json())
            .then((data) => {
                this.setState({user: data});
                this.props.update();
            }).catch((data) => {
                this.setState({user:this.defaultUser});
            });
    }

    render() {
        if(this.state && this.state.user){
            // console.log(this.state.user);
            return (
                <div className="user-form">
                    <div>
                        Name <input type="text" name="name" value={this.state.user.name} onChange={this.inputChange}/>
                    </div>
                    <div>
                        Email <input type="text" name="email" value={this.state.user.email} onChange={this.inputChange}/>
                    </div>
                    <div>
                        Password <input type="password" name="password" value={this.state.user.password} onChange={this.inputChange}/>
                    </div>
                    <div>
                        Role <select name="role" value={this.state.user.role} onChange={this.inputChange}>
                            <option value="1">Admin</option>
                            <option value="2">Normal User</option>
                        </select>
                    </div>
                    <div>
                        <button value="true" onClick={this.save}>Save</button>
                    </div>
                </div>
            )
        }else{
            return (<div>Loading...</div>);
        }
    }
}

export default UserForm;
