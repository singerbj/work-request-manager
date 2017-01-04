import React from 'react';
import Strings from '../../helpers/Strings.js';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.goToTasks = this.goToTasks.bind(this);
        this.goToUsers = this.goToUsers.bind(this);
        this.goToAbout = this.goToAbout.bind(this);
    }

    toggleMenu () {
        this.props.toggleMenu();
    }

    goToHome() {
        document.location.hash = 'Home';
        this.props.navigate();
    }

    goToTasks() {
        document.location.hash = 'Tasks';
        this.props.navigate();
    }

    goToUsers() {
        document.location.hash = 'Users';
        this.props.navigate();
    }

    goToAbout() {
        document.location.hash = 'About';
        this.props.navigate();
    }

    render() {
        return (
            <div className="menu">
                <div className="menu-icon" onClick={this.toggleMenu}>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </div>
                <ul>
                    <li onClick={this.goToHome}>Home</li>
                    <li onClick={this.goToTasks}>Tasks</li>
                    <li onClick={this.goToUsers}>Users</li>
                    <li onClick={this.goToAbout}>About</li>
                </ul>
            </div>
        )
    }
}

export default Menu;
