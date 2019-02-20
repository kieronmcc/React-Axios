import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    async componentDidUpdate () {
        if (this.props.id) {
            if ( this.state.loadedPost && this.state.loadedPost.id === this.props.id) {
                return;
            }
            const postRes = await axios.get(`/posts/${this.props.id}`);
            const loadedPost = postRes.data;
            this.setState({loadedPost});
            console.log(loadedPost);
        }
    }

    deletePostHandler = async () => {
        const res = await axios.delete(`/posts/${this.props.id}`);
        console.log( "Deleted : ", res);
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading!</p>
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            )
        }

        return post;
    }
}

export default FullPost;