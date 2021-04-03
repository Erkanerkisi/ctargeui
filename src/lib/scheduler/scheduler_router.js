import logo from "../../logo.svg";
import TasksPage from "./component/page/tasks/tasks_page";
import ScheduledTasksPage from "./component/page/scheduledTasks/scheduled_tasks_page";
import CreateTaskPage from "./component/page/tasks/create_task_page";
import SchedulerDashboard from "./component/page/scheduler_dashboard";

import { Navbar, Nav } from "react-bootstrap";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function Scheduler() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/scheduler">
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
            <Nav.Link href="/scheduler/scheduledTasks">
              Scheduled Tasks
            </Nav.Link>
            <Nav.Link href="/scheduler/tasks">Tasks</Nav.Link>
            <Nav.Link href="/scheduler/createTask">Create Task</Nav.Link>
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
          <Route path="/scheduler/tasks">
            <TasksPage />
          </Route>
          <Route path="/scheduler/scheduledTasks">
            <ScheduledTasksPage />
          </Route>
          <Route path="/scheduler/createTask">
            <CreateTaskPage />
          </Route>
          <Route path="/scheduler">
            <SchedulerDashboard />
          </Route>
          <Route path="/scheduler/schedulerDashboard">
            <SchedulerDashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Scheduler;
