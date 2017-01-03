import React from 'react';
import Strings from '../../helpers/Strings.js';

class About extends React.Component {
    constructor(props) {
        super(props);
        // this.getContentForPost = this.getContentForPost.bind(this);
    }

    render() {
        return (
            <div className="home">
                <span>About</span>
            </div>
        )
    }
}

export default About;
