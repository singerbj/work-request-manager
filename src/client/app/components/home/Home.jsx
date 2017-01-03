import React from 'react';
import Strings from '../../helpers/Strings.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.getContentForPost = this.getContentForPost.bind(this);
    }

    render() {
        return (
            <div className="home">
                <span>Home</span>
            </div>
        )
    }
}

export default Home;
