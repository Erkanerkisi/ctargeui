import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Alert, Form,InputGroup } from "react-bootstrap";
import ScheduledTaskDetail from "./scheduled_task_detail";
import Welcome from "../../welcome";
import { getScheduledTasks } from "../../../network/network";
import SchSpinner from "../../spinner";
import { Search } from "react-bootstrap-icons";

export default class ScheduledTasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selectedTask: null,
      activeTaskId: 0,
      isLoading: true,
      serviceError: false,
      filteredTasks: [],
    };
    this.onTaskSelect = this.onTaskSelect.bind(this);
  }

  componentDidMount() {
    getScheduledTasks().then((res) => {
      if (res.httpStatusCode == 200) {
        this.setState({ tasks: res.body,filteredTasks: res.body, isLoading: false });
      } else {
        this.setState({ serviceError: true, isLoading: false });
      }
    });
  }

  onTaskSelect = (task) => {
    this.setState({
      selectedTask: task,
    });
  };

  renderTaskDetail() {
    var taskDetail;
    if (this.state.selectedTask == null) {
      taskDetail = <Welcome />;
    } else {
      taskDetail = (
        <ScheduledTaskDetail
          taskDetail={this.state.selectedTask}
        ></ScheduledTaskDetail>
      );
    }

    return taskDetail;
  }

  onSearchTextChanged = (e) => {
    var filterText = e.target.value != null ? e.target.value.toLowerCase() : e.target.value;
    var filteredTasks = this.state.tasks.filter((fil) =>fil.taskName.toLowerCase().includes(filterText));
    this.setState({
      filteredTasks: filteredTasks,
    });
  };

  renderBody() {
    return (
      <Container fluid>
        <br />
        <Row>
          <Col xs={3} className="justify-content-md-center">
          <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                label="search"
                placeholder="Search"
                name="search"
                onChange={this.onSearchTextChanged}
              />
            </InputGroup>
            <h3 className="text-center">Scheduled Tasks</h3>
            <ListGroup>
              {this.state.filteredTasks.map((index) => {
                return (
                  <ListGroup.Item
                    active={
                      this.state.selectedTask != null &&
                      index.id == this.state.selectedTask.id
                    }
                    key={index.id}
                    onClick={() => this.onTaskSelect(index)}
                  >
                    {index.taskName}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>

          <Col xs={9}>{this.renderTaskDetail()}</Col>
        </Row>
      </Container>
    );
  }

  render() {
    if (this.state.isLoading) {
      return <SchSpinner />;
    } else if (this.state.serviceError) {
      return (
        <Container>
          <br />
          <Alert key={1} variant="danger" dismissible>
            Could not load data from service
          </Alert>
        </Container>
      );
    } else {
      return this.renderBody();
    }
  }
}
