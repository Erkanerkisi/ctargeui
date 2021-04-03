import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";

export default class Welcome extends Component {
  render() {
    return (
      <Jumbotron>
        <h1>Welcome Back!</h1>
        <p>
          This is a simple dashboard that you can manage your operations. Start with
          selecting operations on the left side!
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    );
  }
}
