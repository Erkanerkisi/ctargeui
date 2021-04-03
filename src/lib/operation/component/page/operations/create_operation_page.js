import React, { Component } from "react";
import { Form, Row, Col, Container, Button, Alert } from "react-bootstrap";
import { addOperation } from "../../../network/network";

const errorMessage = "Creation of task has failed!";
const successMessage = "Task has been successfully created!";

export default class CreateOperationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operationDetail: {
        id: null,
        code: null,
        uri: null,
        method: null,
        className: null,
        callSystem: null,
        createdUser: null,
        updatedUser: null,
      },
      errors: [],
      showErrorAlert: false,
      showSuccessAlert: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  showSuccessAlert = (val) => {
    this.setState({ showSuccessAlert: val });
  };
  showErrorAlert = (val) => {
    this.setState({ showErrorAlert: val });
  };

  onSubmit = () => {
    let errors = [];

    if (
      this.state.operationDetail.code == null ||
      this.state.operationDetail.code === ""
    ) {
      errors.push("code");
    }
    if (
      this.state.operationDetail.uri == null ||
      this.state.operationDetail.uri === ""
    ) {
      errors.push("uri");
    }
    if (
      this.state.operationDetail.method == null ||
      this.state.operationDetail.method === ""
    ) {
      errors.push("method");
    }
    if (
      this.state.operationDetail.className == null ||
      this.state.operationDetail.className === ""
    ) {
      errors.push("className");
    }
    if (
      this.state.operationDetail.callSystem == null ||
      this.state.operationDetail.callSystem === ""
    ) {
      errors.push("callSystem");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      addOperation(this.state.operationDetail).then((response) => {
        if (response.httpStatusCode == 200) {
          this.showSuccessAlert(true);
        } else {
          this.showErrorAlert(true);
        }
      });
    }
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    return (
      <Container fluid>
        <br />
        {this.state.showSuccessAlert && (
          <Alert
            key={1}
            variant="success"
            dismissible
            onClose={() => this.showSuccessAlert(false)}
          >
            {successMessage}
          </Alert>
        )}
        {this.state.showErrorAlert && (
          <Alert
            key={1}
            variant="danger"
            dismissible
            onClose={() => this.showErrorAlert(false)}
          >
            {errorMessage}
          </Alert>
        )}
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Form>
              <Form.Group controlId="code">
                <Form.Label>Code*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("code")}
                  label="code"
                  placeholder="code"
                  name="code"
                  onChange={(e) =>
                    this.setState({
                      operationDetail: {
                        ...this.state.operationDetail,
                        code: e.target.value,
                      },
                    })
                  }
                  value={this.state.operationDetail.code}
                />
              </Form.Group>

              <Form.Group controlId="uri">
                <Form.Label>uri*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("uri")}
                  name="uri"
                  placeholder="uri"
                  onChange={(e) =>
                    this.setState({
                      operationDetail: {
                        ...this.state.operationDetail,
                        uri: e.target.value,
                      },
                    })
                  }
                  value={this.state.operationDetail.uri}
                />
              </Form.Group>

              <Form.Group controlId="method">
                <Form.Label>method*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("method")}
                  name="method"
                  placeholder="Enter method"
                  onChange={(e) =>
                    this.setState({
                      operationDetail: {
                        ...this.state.operationDetail,
                        method: e.target.value,
                      },
                    })
                  }
                  value={this.state.operationDetail.method}
                />
              </Form.Group>
              <Form.Group controlId="callSystem">
                <Form.Label>callSystem*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("callSystem")}
                  name="callSystem"
                  placeholder="Enter callSystem"
                  onChange={(e) =>
                    this.setState({
                      operationDetail: {
                        ...this.state.operationDetail,
                        callSystem: e.target.value,
                      },
                    })
                  }
                  value={this.state.operationDetail.callSystem}
                />
              </Form.Group>
              <Form.Group controlId="className">
                <Form.Label>className*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("className")}
                  name="className"
                  placeholder="Enter className"
                  onChange={(e) =>
                    this.setState({
                      operationDetail: {
                        ...this.state.operationDetail,
                        className: e.target.value,
                      },
                    })
                  }
                  value={this.state.operationDetail.className}
                />
              </Form.Group>
              <Form.Group controlId="createdUser">
                <Form.Label>createdUser*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("createdUser")}
                  name="createdUser"
                  placeholder="Enter createdUser"
                  onChange={(e) =>
                    this.setState({
                      operationDetail: {
                        ...this.state.operationDetail,
                        createdUser: e.target.value,
                      },
                    })
                  }
                  value={this.state.operationDetail.createdUser}
                />
              </Form.Group>
              <Form.Group controlId="updatedUser">
                <Form.Label>updatedUser*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("updatedUser")}
                  name="updatedUser"
                  placeholder="Enter updatedUser"
                  onChange={(e) =>
                    this.setState({
                      operationDetail: {
                        ...this.state.operationDetail,
                        updatedUser: e.target.value,
                      },
                    })
                  }
                  value={this.state.operationDetail.updatedUser}
                />
              </Form.Group>
              <Form.Group controlId="xx">
                <Button
                  variant="primary"
                  onClick={this.onSubmit}
                  style={{ width: "100%" }}
                >
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={4}></Col>
        </Row>
        <br />
      </Container>
    );
  }
}
