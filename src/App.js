import { Navbar, Nav } from "react-bootstrap";
import { Route, Link, Switch, BrowserRouter } from "react-router-dom";
import Dashboard from "./lib/dashboard/dashboard";
import Scheduler from "./lib/scheduler/scheduler_router";
import Operation from "./lib/operation/operation_router";

function App() {
  return (
    
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/scheduler" component={Scheduler} />
        <Route path="/operation" component={Operation} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
