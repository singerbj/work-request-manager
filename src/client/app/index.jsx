import React from 'react';
import {render} from 'react-dom';

// import Ajax from './helpers/Ajax.js';
import Header from './components/layout/Header.jsx';
import Menu from './components/layout/Menu.jsx';
import Home from './components/home/Home.jsx';
import About from './components/about/About.jsx';
import UserList from './components/user/UserList.jsx';
import TaskList from './components/task/TaskList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fail: false};
        this.renderContent = this.renderContent.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.navigate = this.navigate.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        // this.concatJSX = this.concatJSX.bind(this);
    }

    toggleMenu () {
        document.body.classList.toggle('menu-open');
    }

    navigate (){
        this.forceUpdate();
    }

    renderContent () {
        var hash = document.location.hash.replace('#','');
        if(hash === 'Tasks'){
            return (
                <div>
                    <TaskList></TaskList>
                </div>
            );
        }else if(hash === 'Users'){
            return (
                <div>
                    <UserList></UserList>
                </div>
            );
        }else if(hash === 'About'){
            return (
                <div>
                    <About></About>
                </div>
            );
        }else{
            document.location.hash = 'Home';
            return (
                <div>
                    <Home></Home>
                </div>
            );
        }
    }

    render () {
        return (
            <div>
                <Menu toggleMenu={this.toggleMenu} navigate={this.navigate}></Menu>
                <div className="content">
                    <div className="container-fluid">
                        <Header></Header>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }

    // updateData (after) {
    //     this.setState({data: undefined});
    //     return Ajax.getData(this.sub || 'all')
    //     .then((response) => response.json())
    //     .then((data) => {
    //         this.state.failed = false;
    //         this.state.data = data.data;
    //         this.setState(this.state);
    //     }).catch((data) => {
    //         this.state.failed = true;
    //         this.setState(this.state);
    //     });
    // }

    // componentDidMount () {
    //     this.updateData();
    // }

    // concatJSX () {
    //     let jsx = [];
    //     jsx.push(
    //         <div key={'controls'}>
    //             <br/>
    //             <button className="btn btn-default" onClick={this.updateData}>Refresh</button>
    //             <br/>
    //             <br/>
    //             <input className="form-control" type="text" onChange={this.changeSub}/>
    //         </div>
    //     );
    //     if(this.state.failed !== true){
    //         if(this.state.data){
    //             jsx.push(
    //                 <div key={'listing'}>
    //                     <br/>
    //                     <PostList posts={this.state.data.children} />
    //                 </div>
    //             );
    //         }else{
    //             jsx.push(
    //                 <div key={'loading'}>
    //                     <br/>
    //                     <span>Loading...</span>
    //                 </div>
    //             );
    //         }
    //     }else{
    //         jsx.push(
    //             <div key={'error'}>
    //                 <br/>
    //                 <span>Failed to get posts...</span>
    //             </div>
    //         );
    //     }
    //
    //     return jsx;
    // }
}

render(<App/>, document.getElementById('app'));
