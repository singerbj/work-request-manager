import React from 'react';
import {render} from 'react-dom';

import Dom from './helpers/Dom.js';
import Ajax from './helpers/Ajax.js';
import Login from './components/login/Login.jsx';
import Header from './components/layout/Header.jsx';
import Menu from './components/layout/Menu.jsx';
import Form from './components/layout/Form.jsx';
import Home from './components/home/Home.jsx';
import About from './components/about/About.jsx';
import UserList from './components/user/UserList.jsx';
import TaskList from './components/task/TaskList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fail: false, title: document.location.hash.replace('#','')};
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.loadForm = this.loadForm.bind(this);
        this.navigate = this.navigate.bind(this);
        this.update = this.update.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    toggleMenu () {
        document.body.classList.toggle('menu-open');
    }

    closeForm () {
        Dom.removeClass(document.body,'form-open');
    }

    loadForm (formData) {
        this.setState({formData: formData});
    }

    navigate (){
        var hash = document.location.hash.replace('#','');
        this.setState({title: hash});
    }

    update () {
        this.forceUpdate();
    }

    componentDidMount () {
        // Ajax.login.status()
        //     .then((response) => response.json())
        //     .then((data) => {
        //         Helpers.addClass(document.body, 'hide-login');
        //     }).catch((data) => {
        //         console.log(data.message);
        //     });
    }

    renderContent () {
        var hash = document.location.hash.replace('#','');
        if(hash === 'Tasks'){
            return (
                <div><TaskList loadForm={this.loadForm} update={this.update}></TaskList></div>
            );
        }else if(hash === 'Users'){
            return (
                <div><UserList loadForm={this.loadForm} update={this.update}></UserList></div>
            );
        }else if(hash === 'About'){
            return (
                <div><About></About></div>
            );
        }else{
            document.location.hash = 'Home';
            return (
                <div><Home></Home></div>
            );
        }
    }

    render () {
        return (
            <div>
                {/* <Login hideLogin={this.hideLogin}></Login> */}
                <Menu toggleMenu={this.toggleMenu} navigate={this.navigate}></Menu>
                <Form closeForm={this.closeForm} formData={this.state.formData} update={this.update}></Form>
                <div className="content">
                    <div className="container-fluid">
                        <Header title={this.state.title}></Header>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
