// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';

const Home = () => <h2>Welcome to Snackers Republic</h2>;

const App = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/home" component={Home} />
        </Switch>
    </Router>
);

export default App;
