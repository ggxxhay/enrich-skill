import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import PersonsInfo from './components/PersonsInfo'
import PersonsInfoDetails from './components/PersonsInfoDetails'

import "./App.css";
import City from "./components/City";

const personsData = [
  { id: 1, name: "Thang", age: 18, address: "Hanoi", job: "Developer" },
  { id: 2, name: "Thang 2", age: 22, address: "Hanoi 2", job: "Pilot" },
  { id: 3, name: "Thang 3", age: 21, address: "Hanoi 3", job: "Farmer" },
]

function App() {
  return (
    <Router>
      <Container>
        <Nav>
          <Nav.Item>
            <NavLink className="nav-link" activeClassName="nav-link-active" exact to="/">Home</NavLink>
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
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
        </Nav>

        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/persons" render={props => <PersonsInfo {...props} data={personsData} />} />
          <Route exact path="/persons/:id" render={props => <PersonsInfoDetails {...props} data={personsData.find(p => p.id.toString() === props.match.params.id)} />} />
          <Route exact path="/city">
            <City />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default App;
