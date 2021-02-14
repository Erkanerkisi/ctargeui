import React, { Component } from "react";
import { getScheduledTasks, getTasks } from "../../network/network";
import { Card, Row, Col, Container, Toast, Alert } from "react-bootstrap";
import SchSpinner from "../spinner";

const errorMessage = "Could not load data from service";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      scheduledTasks: [],
      showAlert: false,
      error: false
    };
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert = (val) => {
    this.setState({ showAlert: val });
  };

  componentDidMount() {
    getTasks().then((res) => {
      if (res.httpStatusCode == 200) {
        this.setState({ tasks: res.body });
      } else {
        this.setState({error:true})
      }
    });

    getScheduledTasks().then((res) => {
      if (res.httpStatusCode == 200) {
        this.setState({ scheduledTasks: res.body });
      } else {
        this.setState({error:true})
      }
    });
    if(this.state.error){
      this.showAlert(true);
    }
  }

  render() {
    return (
      <Container>
        <br />
        {this.state.showAlert && (
          <Alert
            key={1}
            variant="danger"
            dismissible
            onClose={() => this.showAlert(false)}
          >
            {errorMessage}
          </Alert>
        )}
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
                <Card.Text>
                  <br />
                  <h1>{this.state.scheduledTasks.length}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
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
                <Card.Title>Total Tasks On Db</Card.Title>
                <Card.Text>
                  <br />
                  <h1>{this.state.tasks.length}</h1>
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
                <Card.Title>Active Tasks On Db</Card.Title>
                <Card.Text>
                  <br />
                  <h1>
                    {
                      this.state.tasks.filter((fil) => fil.status == "Active")
                        .length
                    }
                  </h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        
        </Row>
        <br />
        <Row className="justify-content-md-center">
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
                <Card.Title>Passive Tasks On Db</Card.Title>
                <Card.Text>
                  <br />
                  <h1>
                    {
                      this.state.tasks.filter((fil) => fil.status != "Active")
                        .length
                    }
                  </h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
