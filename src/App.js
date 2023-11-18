import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import BooleanQuestion2 from './pages/BooleanQuestion2.js';
import MCQGame from './pages/MCQGame';
//import AdminPage from './pages/AdminPage';
import { AdminPage } from './pages/AdminPage';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/boolean-game">True/False Game</Link></li>
            <li><Link to="/mcq-game">MCQ Game</Link></li>
            <li><Link to="/admin">Admin Page</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>

        {/* Définir les routes */}
        <Switch>
          <Route path="/boolean-game" component={BooleanQuestion2} />
          <Route path="/mcq-game" component={MCQGame} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
