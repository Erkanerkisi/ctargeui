import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { data } from "../constant/constant";
import TaskDetail from "./task_detail";
import Welcome from "./welcome";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: data,
      selectedTask: null,
      activeTaskId: 0,
    };
    this.onTaskSelect = this.onTaskSelect.bind(this);
  }

  onTaskSelect = (task) => {
    this.setState({
      selectedTask: task,
    });
  };

  render() {
    var taskDetail;
    if (this.state.selectedTask == null) {
      taskDetail = <Welcome />;
    } else {
      taskDetail = (
        <TaskDetail taskDetail={this.state.selectedTask}></TaskDetail>
      );
    }

    return (
      <Container fluid>
        <br />
        <Row>
          <Col xs={3}>
            <h1>
              <Badge variant="secondary">Tasks</Badge>
            </h1>
            <ListGroup displayName="erer">
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

          <Col xs={9}>{taskDetail}</Col>
        </Row>
      </Container>
    );
  }
}
