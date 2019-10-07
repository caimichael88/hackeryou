import React from 'react';
import ReactDOM from 'react-dom';
import Movies from './components/Movies';
import themoviedb from './lib/themoviedb/themoviedb';
import './index.css';

ReactDOM.render(<Movies />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

