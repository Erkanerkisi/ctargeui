import logo from "./logo.svg";
import Home from "./lib/components/home";
import AddTask from "./lib/components/add_task";
import { Navbar, Nav } from 'react-bootstrap';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Scheduler Dashboard
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Overview</Nav.Link>
          <Nav.Link href="/add">Add Task</Nav.Link>
        </Nav>
      </Navbar>
        <Switch>
          <Route path="/home">
          <Home />
          </ Route>
          <Route path="/add">
            <AddTask/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
