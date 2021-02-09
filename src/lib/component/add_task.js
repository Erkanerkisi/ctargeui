import React, { Component } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { data } from "../constant/constant";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail: {
        id: null,
        beanName: null,
        taskName: null,
        lockDuration: null,
        headers: [],
        cron: [],
        body: null,
        depencdency: null
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = () => {
    data.push(this.state.taskDetail);
    console.log("taskDetail : " + this.state.taskDetail.beanName);
    console.log("taskDetail : " + this.state.taskDetail.taskName);
  };

  render() {
    return (
      <Container fluid>
        <br />
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Id</Form.Label>
                <Form.Control disabled value={this.state.taskDetail.id} />
              </Form.Group>

              <Form.Group controlId="beanName">
                <Form.Label>Bean Name</Form.Label>
                <Form.Control
                  placeholder="Enter Bean Name"
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        beanName: e.target.value,
                      },
                    })
                  }
                  value={this.state.taskDetail.beanName}
                />
              </Form.Group>

              <Form.Group controlId="taskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  label="Task Name"
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        taskName: e.target.value,
                      },
                    })
                  }
                  value={this.state.taskDetail.taskName}
                />
              </Form.Group>

              <Form.Group controlId="lockDuration">
                <Form.Label>Lock Duration</Form.Label>
                <Form.Control
                  placeholder="Lock Duration"
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        lockDuration: e.target.value,
                      },
                    })
                  }
                  value={this.state.taskDetail.lockDuration}
                />
              </Form.Group>
              <Form.Group controlId = "not">
                <Form.Label>Note: Dont forget to complete other infos like header, cron, body and make active on scheduler dashboard!</Form.Label>
              </Form.Group>

              <Button onClick={this.onSubmit} variant="primary">
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
    );
  }
}
