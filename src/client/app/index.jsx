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
        var menuOpen = window.localStorage.getItem('menu-open');
        if(menuOpen === 'true'){
            window.localStorage.setItem('menu-open', false);
            Dom.addClass(document.body, 'menu-open');
        }else{
            window.localStorage.setItem('menu-open', true);
            Dom.removeClass(document.body, 'menu-open');
        }
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
        Dom.removeClass(document.body,'form-open');
    }

    update () {
        this.forceUpdate();
    }

    componentDidMount () {
        this.toggleMenu();
        this.toggleMenu();
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                this.closeForm();
            }
        });
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
