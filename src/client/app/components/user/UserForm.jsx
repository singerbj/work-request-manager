import React from 'react';
import Ajax from '../../helpers/Ajax.js';
import Dom from '../../helpers/Dom.js';

const defaultUser = {name:'', email:'', password:'', role: '1'};

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        if(props.user && props.user.id){
            this.state = {user: props.user};
            this.getUser(props.user);
        }else{
            this.state = {user: Dom.clone(defaultUser)};
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
            this.setState({user: Dom.clone(defaultUser)});
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user && nextProps.user.id){
            this.setState({user: nextProps.user, error: null}, function(){
                this.getUser(nextProps.user);
            });
        }else{
            this.setState({user: Dom.clone(defaultUser), error: null});
        }
    }

    inputChange (event) {
        this.state.user[event.currentTarget.name] = event.currentTarget.value;
        this.setState(this.state);
    }

    save () {
        var key = 'save';
        this.state.user.password = 'password';
        this.state.user.role = 1;
        this.state.error = null;
        if(this.state.user.id){
            key = 'update';
        }
        return Ajax.user[key](this.state.user)
            .then((response) => response.json())
            .then((data) => {
                if(!data.error){
                    this.setState({user: Dom.clone(defaultUser)});
                    this.props.update();
                    Dom.removeClass(document.body,'form-open');
                }else{
                    this.setState({error: data.error});
                }
            }).catch((data) => {
                console.log(data);
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
                    {/* <div>
                        Password <input type="password" name="password" value={this.state.user.password} onChange={this.inputChange}/>
                    </div>
                    <div>
                        Role <select name="role" value={this.state.user.role} onChange={this.inputChange}>
                            <option value="1">Admin</option>
                            <option value="2">Normal User</option>
                        </select>
                    </div> */}
                    <div>
                        <button value="true" onClick={this.save}>Save</button>
                    </div>
                    <div>
                        <div className={'error ' + (!this.state.error ? 'hidden' : '')}>{this.state.error}</div>
                    </div>
                </div>
            )
        }else{
            return (<div>Loading...</div>);
        }
    }
}

export default UserForm;
