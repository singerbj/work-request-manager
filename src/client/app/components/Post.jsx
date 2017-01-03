import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import Strings from '../helpers/Strings.js';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.defaultImgUrl = 'http://en.game-tournaments.com/media/logo/_60/pic-20161117-300x300-2335040667.png';
        this.state = { showModal: false };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.getContentForPost = this.getContentForPost.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    getContentForPost (url) {
        url = url.replace(/&amp;/g, '&');
        let jsx;
        if(url.indexOf('.gifv') > -1){
            jsx = (
                <video poster={url.replace('.gifv', '.jpg')} preload="auto" autoPlay="autoplay" muted="muted" loop="loop" style={{width: '100%', background: 'grey'}}>
                    <source src={url.replace('.gifv', '.mp4')} type="video/mp4"/>
                </video>
            );
        }else if(url.indexOf('i.reddituploads.com/') > -1 || url.indexOf('.jpg') > -1 || url.indexOf('.jpeg') > -1 || url.indexOf('.png') > -1 || url.indexOf('.gif') > -1){
            jsx = (
                <img src={url} style={{width: '100%', background: 'grey'}}/>
            );
        }else{
            jsx = (
                <div>
                    <div>Looks like this post is an article or full of texty text.</div>
                    <a href={url} target="_blank">Open it in a new tab!</a>
                </div>
            )
        }

        return (
            <div>
                {jsx}
            </div>
        );
    }

    render() {
        if(this.props.post){
            let imageUrl;
            if(this.props.post.thumbnail !== 'default' && this.props.post.thumbnail !== 'image' && this.props.post.thumbnail !== 'self' && this.props.post.thumbnail !== 'nsfw'){
                imageUrl = this.props.post.thumbnail;
            }else if(this.props.post.thumbnail === 'image'){
                imageUrl = this.props.post.url;
            }else{
                imageUrl = this.defaultImgUrl;
            }

            return (
                <div>
                    <img src={imageUrl} style={{width: '60px', height: '60px', background: 'grey'}}/>
                    <a href={'#'} onClick={this.open}> {Strings.limitCharacters(this.props.post.title, 75)}</a>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Post Quickview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <img src={this.props.post.url} style={{width: '60px', height: '60px', background: 'grey'}}/> */}
                            {this.getContentForPost(this.props.post.url)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
            );
        }else{
            return (
                <div>
                    <span>Loading...</span>
                </div>
            )
        }
    }
}

export default Post;
