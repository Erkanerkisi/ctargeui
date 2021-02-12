import logo from "./logo.svg";
import TasksPage from "./lib/component/page/tasks/tasks_page";
import ScheduledTasksPage from "./lib/component/page/scheduledTasks/scheduled_tasks_page";
import CreateTaskPage from "./lib/component/page/tasks/create_task_page";
import Dashboard from "./lib/component/page/dashboard";

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
        <Nav.Link href="/scheduledTasks">Scheduled Tasks</Nav.Link>
          <Nav.Link href="/tasks">Tasks</Nav.Link>
          <Nav.Link href="/createTask">Create Task</Nav.Link>
        </Nav>
      </Navbar>
        <Switch>
          <Route path="/tasks">
          <TasksPage />
          </ Route>
          <Route path="/scheduledTasks">
          <ScheduledTasksPage/>
          </ Route>
          <Route path="/createTask">
            <CreateTaskPage/>
          </Route>
          <Route path="/">
            <TasksPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
