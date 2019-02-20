import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// axios global configuartion
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(requestConf => {
    console.log(requestConf);
    // Here you can edit the request config before it is
    // sent globally for any request. NB this is a Promise
    return requestConf;
}, error => {
    console.log("Request Error: ", error);
    return Promise.reject(error);
});

axios.interceptors.response.use( responseConf => {
    console.log(responseConf);
    return responseConf;
}, error => {
    console.log("Response Error: ", error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
