import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Testselection from './testselection';
import Quiz from './quiz';

const Q = function ({ match }) {
    return (
        <Quiz test={match.params.test} />
    );
};

const App = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Testselection} />
            <Route exact path="/quiz.html" component={Testselection} />
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
