import React, { Component } from 'react';
//import axios from 'axios';
//import axios from '../../axios'; // Now importing axios instance with specific config
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

/* So when considering lazy loading of a component or container
it is important to remember that web-pack will see an import as a dependency 
and include it in the bundle deployed to the server. In the example below we will
make web-pack create an extra bundle for the component to be lazy loaded (code split)*/

//import NewPost from './NewPost/NewPost'; 
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    // so this syntax will trigger web-pack to create another bundle with this
    // dynamically imported class. This bundle only gets downloaded when
    // this dynamic class is rendered.
    return import('./NewPost/NewPost'); 
});

class Blog extends Component {

    state = {
        auth: true
    }

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* So Link replaces href and mean this React Router component avoids
                            the page reload which would reset the state of the entire React app. with this Link 
                            component React only updates the required parts on the DOM. Note that with Link
                            the 'to' property is always an absolute path. Ypu can achieve a relative path by appending
                            the target path on to the end of 'this.props.match.url' from the React Route match prop. NavLink 
                            just adds extra props (class=active) to enable styling of the Link. Note 'exact' on the Link just
                            means the styling applies only to the full path and not paths contain that string/path 
                            (i.e as with the Route component.) */}
                            <li><NavLink 
                                to="/posts" 
                                exact 
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/"  render={() => <h1>Home 2</h1>} />
                Note that the Switch component tell React Router to break
                after finding the first matching route. In the example below 
                the last two routes are in fact equivalent and both will be rendered.
                But they have to be in this order or new post won't get rendered!!
                */}
                <Switch>
                    {/* Illustrating use of Routing guards */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null }
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                    {/* handling 404 unknown route errors. 
                    By specifying a Route with no path this way unknown routes can be redirected if they are not handled
                    by preceding Routes. So a catch all case will always come last in the list. */}
                    <Route render={() => <h1>Path Not Found</h1>} />
                    {/* make at nested route in posts component<Route path="/:postId" exact component={FullPost} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;