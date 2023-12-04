import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'; // Assurez-vous d'importer Link
import BooleanQuestion2 from './pages/BooleanQuestion2';
import MCQGame from './pages/MCQGame';
import { AdminPage } from './pages/AdminPage'; // Importation correcte d'AdminPage
import Logout from './pages/Logout';
import Login from './pages/Login'; // Assurez-vous d'avoir un composant Login

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/boolean-game">True/False Game</Link></li>
            <li><Link to="/mcq-game">MCQ Game</Link></li>
            <li><Link to="/admin">Admin Page</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>

        {/* Définir les routes */}
        <Switch>
          <Route path="/boolean-game" component={BooleanQuestion2} />
          <Route path="/mcq-game" component={MCQGame} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
