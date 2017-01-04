import React from 'react';
import Strings from '../../helpers/Strings.js';

class Header extends React.Component {
    constructor(props) {
        super(props);
        // this.getContentForPost = this.getContentForPost.bind(this);
    }

    render() {
        return (
            <div className="header">
                <span>{this.props.title}</span>
            </div>
        )
    }
}

export default Header;
