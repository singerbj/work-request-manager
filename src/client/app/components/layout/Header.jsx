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
                <span>Header</span>
            </div>
        )
    }
}

export default Header;
