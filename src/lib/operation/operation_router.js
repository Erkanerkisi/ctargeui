import logo from "../../logo.svg";
import OperationsPage from "./component/page/operations/operation_page";

import { Navbar, Nav } from "react-bootstrap";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import CreateOperationPage from "./component/page/operations/create_operation_page";
import CreateOperationFile from "./component/page/operations/create_operation_file_page";

function Operation() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/operation">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Operation Dashboard
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/operation">Operations</Nav.Link>
            <Nav.Link href="/operation/create">Create Operation</Nav.Link>
            <Nav.Link href="/operation/file">Ex/Im File</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            </Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/operation/create">
            <CreateOperationPage />
          </Route>
          <Route path="/operation/file">
            <CreateOperationFile />
          </Route>
          <Route path="/operation">
            <OperationsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Operation;
