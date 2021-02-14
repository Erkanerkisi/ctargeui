import React, { Component } from "react";
import { getScheduledTasks, getTasks } from "../../network/network";
import { CardColumns, Card, Row, Col, Container } from "react-bootstrap";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      scheduledTasks: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    getScheduledTasks().then((res) => {
      getTasks().then((res2) => {
        this.setState({ tasks: res, scheduledTasks: res2, isLoading: false });
      });
    });
  }

  render() {
    return (
      
      <Container>
      <br/>
      <Row className="justify-content-md-center">
        <Col xs lg="4">
          <Card
            bg="dark"
            key={1}
            text="white"
            style={{ width: "18rem" }}
            className="mb-2"
            className="text-center"
          >
            <Card.Body>
              <Card.Title>Scheduled Task Count</Card.Title>
              <Card.Text >
                <br/>
                <h1>{this.state.scheduledTasks.length}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs lg="4">
          <Card
            bg="dark"
            key={2}
            text="white"
            style={{ width: "18rem" }}
            className="mb-2"
            className="text-center"
          >
            <Card.Body>
              <Card.Title>Active Task Count</Card.Title>
              <Card.Text>
              <br/>
              <h1>{this.state.tasks.filter((fil) => fil.status=="Active").length}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs lg="4">
          <Card
            bg="dark"
            key={2}
            text="white"
            style={{ width: "18rem" }}
            className="mb-2"
            className="text-center"
          >
            <Card.Body>
              <Card.Title>Passive Task Count</Card.Title>
              <Card.Text>
              <br/>
              <h1>{this.state.tasks.filter((fil) => fil.status != "Active").length}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    );
  }
}
