import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './login'
import SignUp from './signup'
import Dashboard from './dashboard'

const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp({
  apiKey: "AIzaSyCIW7urxJ4IYkyzVLiOuosp9YKxxXO9tQ0",
  authDomain: "chat-app-by-johny-slima-react.firebaseapp.com",
  databaseURL: "https://chat-app-by-johny-slima-react.firebaseio.com",
  projectId: "chat-app-by-johny-slima-react",
  storageBucket: "chat-app-by-johny-slima-react.appspot.com",
  messagingSenderId: "388858873828",
  appId: "1:388858873828:web:aa3e4e95c5e170013069f1",
  measurementId: "G-W4R5CTHEE7"
})

const routing = (
  <Router>
    <div id='routing-container'>
      <Route path='/login' component={Login}></Route>
      <Route path='/signup' component={SignUp}></Route>
      <Route path='/dashboard' component={Dashboard}></Route>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
