import React, { Component } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { Navbar, Row, Col, Container, Alert } from "react-bootstrap";
import logo from "../../logo.svg";
import AppButton from "./app_button";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
            Dashboard
          </Navbar.Brand>
        </Navbar>
        <br/><br/>
        <Container>
          <Row>
            <Col md={4}>
              <AppButton title = "Scheduler" route = "/scheduler"/>
            </Col>

            <Col md={4}>
              <AppButton title = "Operation Definition" route = "/operation"/>
            </Col>

            <Col md={4}>
              <AppButton title = "Reports" route = "/scheduler"/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
