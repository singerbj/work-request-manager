import React from 'react';
import Strings from '../../helpers/Strings.js';
import Ajax from '../../helpers/Ajax.js';
import Dom from '../../helpers/Dom.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email:'', password:''};
        this.login = this.login.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    login () {
        return Ajax.login.login(this.state)
            .then((response) => response.json())
            .then((data) => {
                Dom.addClass(document.body, 'hide-login');
            }).catch((data) => {
                console.log(data.message);
            });
    }

    inputChange (event) {
        this.state[event.currentTarget.name] = event.currentTarget.value;
        this.setState(this.state);
    }

    render() {
        return (
            <div className="login">
                <div className="login-title">work-request-manager</div>
                <div>Email</div>
                <div>
                    <input type="text" name="email" value={this.state.email} onChange={this.inputChange}/>
                </div>
                <div>Password</div>
                <div>
                    <input type="password" name="password" value={this.state.password} onChange={this.inputChange}/>
                </div>
                <div>
                    <button value="true" onClick={this.login}>Login</button>
                </div>
            </div>
        )
    }
}

export default Login;
