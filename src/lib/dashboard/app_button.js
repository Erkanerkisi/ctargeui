import React, { Component } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { Button, Row, Col, Container, Alert } from "react-bootstrap";
import logo from "../../logo.svg";

export default class AppButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Button
        onClick={() => console.log("adasd")}
        variant="info" 
        style={{
          width: 300,
          height: 170,
          fontSize: 23,
          fontWeight: "bold",
          fontFamily: "Arial",
          borderRadius: "20px",
          justifyContent: "center",
          alignItems: "center",
          display:'flex'
        }}
        href={this.props.route}
      >
        {this.props.title}
      </Button>
    );
  }
}
