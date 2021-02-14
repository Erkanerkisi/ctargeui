import React, { Component } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import TaskDetail from "./task_detail";
import Welcome from "../../welcome";
import { getTasks } from "../../../network/network";
import SchSpinner from "../../spinner";


export default class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selectedTask: null,
      activeTaskId: 0,
      isLoading: true
    };
    this.onTaskSelect = this.onTaskSelect.bind(this);
  }

  componentDidMount() {
    getTasks().then((res)=> {
      this.setState({ tasks: res.body, isLoading: false });
    }); 
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
      this.state.isLoading ? <SchSpinner/> : <Container fluid>
        <br />
        <Row>
          <Col xs={3} className="justify-content-md-center">
            <h3 class="text-center">Tasks</h3>
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

          <Col xs={9}>{taskDetail}</Col>
        </Row>
      </Container>
    );
  }
}
