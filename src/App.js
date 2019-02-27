import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    /*<BrowserRouter basename="/my-app"></BrowserRouter> where the root for the app is other than "/" */
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
