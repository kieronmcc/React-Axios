import React from 'react';
import './Post.css';
import { withRouter} from 'react-router-dom';

/* 
 Because a Post is a contained element of Posts in this app
 it is not directly managed by React Router so we don't automatically
 get its routing props. They can be accessed by being passed as props and
 used explicitly OR we can use the React Router HOC 'withRouter' and wrap the 
 Post component with this to automatically/implicitly get the routing props
 for the nearest routed component (Posts in this case). 
*/

const post = (props) => {
    //console.log(props);
    return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );
};

export default withRouter(post);