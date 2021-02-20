import React, { Component } from "react";
import { getScheduledTasks, getTasks } from "../../network/network";
import { Card, Row, Col, Container, Alert } from "react-bootstrap";
import scheduler from "../../../scheduler.png";

var darkMode = {
  backgroundColor: "#17202E",
  color: "white",
  height: "100vh",
};

var cardBackground = {
  backgroundColor: "#131924",
  width: "18rem",
};

var cardHeaderText = {
  color: "#8091AB",
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={darkMode}>
        <Container>
          <br />
          <Row className="justify-content-md-center">
            <Col xs lg="4">
              <Card>
                <Card.Img variant="top" src={scheduler} />
              </Card>
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}
