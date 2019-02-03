import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TestSelection from './TestSelection';
import Quiz from './quiz';

const Q = function ({ match }) {
    return (
        <Quiz test={match.params.test} />
    );
};

const App = () => (
    <div>
        <Switch>
            <Route exact path="/" component={TestSelection} />
            <Route exact path="/quiz.html" component={TestSelection} />
            <Route path='/starttest/:test' component={Q} />
        </Switch>

    </div>
)
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('content')
);
