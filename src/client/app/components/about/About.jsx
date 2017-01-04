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
                <p>I made a thing that does a thing.</p>
                <p>Ben Singer</p>
            </div>
        )
    }
}

export default About;
