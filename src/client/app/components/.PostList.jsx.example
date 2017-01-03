import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import Post from './Post.jsx';

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.renderPosts = this.renderPosts.bind(this);
    }

    renderPosts () {
        var posts = [];
        this.props.posts.forEach(function(post){
            posts.push(
                <ListGroupItem key={post.data.id}>
                    <Post post={post.data}/>
                </ListGroupItem>
            )
        });
        return posts;
    }

    render() {
        return (
            <div>
                <div className="post-list">
                    <ListGroup>
                        {this.renderPosts()}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default PostList;
