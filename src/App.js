import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import PersonsInfo from './components/PersonsInfo';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';

import "./App.css";
import City from "./components/City";
import { Button } from "react-bootstrap";

const personsData = [
  { id: 1, name: "Thang", age: 18, address: "Hanoi", job: "Developer" },
  { id: 2, name: "Thang 2", age: 22, address: "Hanoi 2", job: "Pilot" },
  { id: 3, name: "Thang 3", age: 21, address: "Hanoi 3", job: "Farmer" },
]

const KEY_IS_LOGGED_IN = "IsLoggedIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY_IS_LOGGED_IN)) {
      setIsLoggedIn(true);
    }
  }, [])

  const onLoggedIn = () => {
    localStorage.setItem(KEY_IS_LOGGED_IN, "1");
    setIsLoggedIn(true);
  }

  const onLogout = () => {
    localStorage.removeItem(KEY_IS_LOGGED_IN);
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return <Login onLoggedIn={onLoggedIn} />;
  }

  return (
    <Router>
        <Nav>
          <Nav.Item>
            <NavLink className="nav-link" activeClassName="nav-link-active" exact to="/">Home</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" activeClassName="nav-link-active" to="/about">About</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" activeClassName="nav-link-active" to="/persons">Persons</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" activeClassName="nav-link-active" to="/city">City</NavLink>
          </Nav.Item>
          <Button variant="danger" onClick={onLogout}>Logout</Button>
        </Nav>

        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/persons" render={props => <PersonsInfo {...props} data={personsData} />} />
          <Route exact path="/city">
            <City />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
