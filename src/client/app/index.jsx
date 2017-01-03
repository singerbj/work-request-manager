import React from 'react';
import {render} from 'react-dom';

import Ajax from './helpers/Ajax.js';
import PostList from './components/PostList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fail: false};
        this.updateData = this.updateData.bind(this);
        this.changeSub = this.changeSub.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.concatJSX = this.concatJSX.bind(this);
    }

    updateData (after) {
        this.setState({data: undefined});
        return Ajax.getData(this.sub || 'all')
        .then((response) => response.json())
        .then((data) => {
            this.state.failed = false;
            this.state.data = data.data;
            this.setState(this.state);
        }).catch((data) => {
            this.state.failed = true;
            this.setState(this.state);
        });
    }

    changeSub (event) {
        this.sub = event.target.value;
        this.updateData();
    }

    componentDidMount () {
        this.updateData();
    }

    concatJSX () {
        let jsx = [];
        jsx.push(
            <div key={'controls'}>
                <br/>
                <button className="btn btn-default" onClick={this.updateData}>Refresh</button>
                <br/>
                <br/>
                <input className="form-control" type="text" onChange={this.changeSub}/>
            </div>
        );
        if(this.state.failed !== true){
            if(this.state.data){
                jsx.push(
                    <div key={'listing'}>
                        <br/>
                        <PostList posts={this.state.data.children} />
                    </div>
                );
            }else{
                jsx.push(
                    <div key={'loading'}>
                        <br/>
                        <span>Loading...</span>
                    </div>
                );
            }
        }else{
            jsx.push(
                <div key={'error'}>
                    <br/>
                    <span>Failed to get posts...</span>
                </div>
            );
        }

        return jsx;
    }

    render () {
        return (
            <div>
                {this.concatJSX()}
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
