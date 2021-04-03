import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import ScheduledTaskDetail from "./scheduled_task_detail";
import Welcome from "../../welcome";
import { getScheduledTasks } from "../../../network/network";
import SchSpinner from "../../spinner";

export default class ScheduledTasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selectedTask: null,
      activeTaskId: 0,
      isLoading: true,
      serviceError: false,
    };
    this.onTaskSelect = this.onTaskSelect.bind(this);
  }

  componentDidMount() {
    getScheduledTasks().then((res) => {
      if (res.httpStatusCode == 200) {
        this.setState({ tasks: res.body, isLoading: false });
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

  renderBody() {
    return (
      <Container fluid>
        <br />
        <Row>
          <Col xs={3} className="justify-content-md-center">
            <h3 className="text-center">Scheduled Tasks</h3>
            <ListGroup>
              {this.state.tasks.map((index) => {
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
