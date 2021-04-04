import React, { Component } from "react";
import { Form, Row, Col, Container, Button, Alert } from "react-bootstrap";
import { PlusSquareFill, DashSquareFill } from "react-bootstrap-icons";
import { addTask } from "../../../network/network";
import Cron from 'react-cron-generator';
import 'react-cron-generator/dist/cron-builder.css';

const errorMessage = "Creation of task has failed!";
const successMessage = "Task has been successfully created!";

export default class CreateTaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail: {
        id: null,
        beanName: null,
        taskName: null,
        pathValue: null,
        maxLockDuration: null,
        status: "Passive",
        requestHeaders: [],
        crons: [],
        requestBody: null,
        finishTaskId: null
      },
      errors: [],
      cronInputValues: [{ id: null, cronValue: "" }],
      headerInputValues: [{ id: null, key: "", value: "" }],
      showErrorAlert: false,
      showSuccessAlert: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.cronInputValuesAddRecord = this.cronInputValuesAddRecord.bind(this);
    this.cronInputValuesDeleteRecord = this.cronInputValuesDeleteRecord.bind(
      this
    );
    this.handleCronInputChange = this.handleCronInputChange.bind(this);
    this.headerInputValuesAddRecord = this.headerInputValuesAddRecord.bind(
      this
    );
    this.headerInputValuesDeleteRecord = this.headerInputValuesDeleteRecord.bind(
      this
    );
    this.handleHeaderInputChange = this.handleHeaderInputChange.bind(this);
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
      this.state.taskDetail.taskName == null ||
      this.state.taskDetail.taskName === ""
    ) {
      errors.push("taskName");
    }
    if (
      this.state.taskDetail.beanName == null ||
      this.state.taskDetail.beanName === ""
    ) {
      errors.push("beanName");
    }
    if (
      this.state.taskDetail.pathValue == null ||
      this.state.taskDetail.pathValue === ""
    ) {
      errors.push("pathValue");
    }
    if (
      this.state.taskDetail.status == null ||
      this.state.taskDetail.status === ""
    ) {
      errors.push("status");
    }
    if (
      this.state.taskDetail.maxLockDuration == null ||
      this.state.taskDetail.maxLockDuration === ""
    ) {
      errors.push("maxLockDuration");
    }

    if (
      this.state.cronInputValues == null ||
      this.state.cronInputValues[0] == null ||
      this.state.cronInputValues[0].cronValue === "" ||
      this.state.cronInputValues[0].cronValue === ""
    ) {
      errors.push("cron");
    }

    if (
      this.state.taskDetail.beanName != null &&
      this.state.taskDetail.beanName == "finishScheduler" &&
      (this.state.taskDetail.finishTaskId == null ||
        this.state.taskDetail.finishTaskId === "")
    ) {
      errors.push("finishTaskId");
    }

    this.state.headerInputValues.forEach((e, index) => {
      if ((e.key == null || e.key == "") && e.value != null && e.value != "") {
        errors.push("header" + index);
      } else if (
        (e.value == null || e.value == "") &&
        e.key != null &&
        e.key != ""
      ) {
        errors.push("header" + index);
      }
    });

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      this.setState(
        {
          taskDetail: {
            ...this.state.taskDetail,
            crons: this.state.cronInputValues,
            requestHeaders: this.state.headerInputValues,
          },
        },
        () => {
          addTask(this.state.taskDetail).then((response) => {
            if (response.httpStatusCode == 200) {
              this.showSuccessAlert(true);
            } else {
              this.showErrorAlert(true);
            }
          });
        }
      );
    }
  };

  cronInputValuesAddRecord = () => {
    const values = [...this.state.cronInputValues];
    values.push({ id: null, cronValue: "" });
    this.setState({
      cronInputValues: values,
    });
  };

  headerInputValuesAddRecord = () => {
    const values = [...this.state.headerInputValues];
    values.push({ id: null, key: "", value: "" });
    this.setState({
      headerInputValues: values,
    });
  };

  cronInputValuesDeleteRecord = (index) => {
    const values = [...this.state.cronInputValues];
    values.splice(index, 1);
    this.setState({
      cronInputValues: values,
    });
  };

  headerInputValuesDeleteRecord = (index) => {
    const values = [...this.state.headerInputValues];
    values.splice(index, 1);
    this.setState({
      headerInputValues: values,
    });
  };

  handleCronInputChange = (index, value) => {
    const values = [...this.state.cronInputValues];
    values[index].cronValue = value;
    this.setState({
      cronInputValues: values,
    });
  };

  handleHeaderInputChange = (index, event) => {
    const values = [...this.state.headerInputValues];
    if (event.target.name === "key") {
      values[index].key = event.target.value;
    } else {
      values[index].value = event.target.value;
    }
    this.setState({
      headerInputValues: values,
    });
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    return (
      <Container fluid={true}>
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

        <Form>
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="taskName">
                <Form.Label>Task Name*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("taskName")}
                  label="Task Name"
                  placeholder="Enter Task Name"
                  name="taskName"
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
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="beanName">
                <Form.Label>Bean Name*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("beanName")}
                  name="beanName"
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
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="pathValue">
                <Form.Label>Path Value*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("pathValue")}
                  name="pathValue"
                  placeholder="Enter Path Value"
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        pathValue: e.target.value,
                      },
                    })
                  }
                  value={this.state.taskDetail.pathValue}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="status">
                <Form.Label>Task Status*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("status")}
                  name="status"
                  label="Task Status"
                  value={this.state.taskDetail.status}
                  as="select"
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        status: e.target.value,
                      },
                    })
                  }
                >
                  <option value="Passive">Passive</option>
                  <option value="Active">Active</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="cronslabel">
                <Form.Label>Cron Expressions*</Form.Label>
              </Form.Group>
            </Col>
          </Row>
          {this.state.cronInputValues.map((input, index) => (
            <Form.Group controlId={"cron" + index}>
              <Form.Row name={"cron" + index} key={"cron" + index} className="justify-content-md-center">
                <Col xs={6} >
                  <div>
                    <Cron
                      name="cron"
                      onChange={(event) =>
                        this.handleCronInputChange(index, input.cronValue)
                      }
                      value={input.cronValue}
                      showResultText={true}
                      showResultCron={true}
                    />
                  </div>
                </Col>
                <Col xs={1}>
                  <Row>
                    <Col xs={1}>
                      <PlusSquareFill
                        size="20"
                        color="green"
                        onClick={() => this.cronInputValuesAddRecord()}
                      />
                    </Col>
                    <Col xs={1}>
                      <DashSquareFill
                        size="20"
                        color="red"
                        onClick={() => this.cronInputValuesDeleteRecord(index)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Row>
            </Form.Group>
          ))}
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="maxLockDuration">
                <Form.Label>Max Lock Duration*</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("maxLockDuration")}
                  name="maxLockDuration"
                  placeholder="Max Lock Duration"
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        maxLockDuration: e.target.value,
                      },
                    })
                  }
                  value={this.state.taskDetail.maxLockDuration}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="headerslabel">
                <Form.Label>Headers</Form.Label>
              </Form.Group>
            </Col>

          </Row>
          {this.state.headerInputValues.map((input, index) => (
            <Row className="justify-content-md-center">
              <Col xs={7}>
                <Form.Group controlId={"header" + index}>
                  <Form.Row key={"header" + index}>
                    <Col xs="auto">
                      <Form.Control
                        isInvalid={this.hasError("header" + index)}
                        name="key"
                        placeholder="Header Key"
                        onChange={(event) =>
                          this.handleHeaderInputChange(index, event)
                        }
                        value={input.key}
                      />
                    </Col>
                    <Col xs="auto">
                      <Form.Control
                        isInvalid={this.hasError("header" + index)}
                        name="value"
                        placeholder="Header Value"
                        onChange={(event) =>
                          this.handleHeaderInputChange(index, event)
                        }
                        value={input.value}
                      />
                    </Col>
                    <Col xs="auto">
                      <PlusSquareFill
                        size="20"
                        color="green"
                        onClick={() => this.headerInputValuesAddRecord()}
                      />
                      {"       "}
                      <DashSquareFill
                        size="20"
                        color="red"
                        onClick={() =>
                          this.headerInputValuesDeleteRecord(index)
                        }
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>
              </Col>

            </Row>
          ))}
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="requestBody">
                <Form.Label>Request Body</Form.Label>
                <Form.Control
                  placeholder="Request Body"
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        requestBody: { id: null, body: e.target.value },
                      },
                    })
                  }
                  value={
                    this.state.taskDetail.requestBody == null
                      ? null
                      : this.state.taskDetail.requestBody.body
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Form.Group controlId="finishTaskId">
                <Form.Label>Finish Task Id</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("finishTaskId")}
                  name="finishTaskId"
                  placeholder="Enter Finish Task Id"
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        finishTaskId: e.target.value,
                      },
                    })
                  }
                  value={this.state.taskDetail.finishTaskId}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={2}>
              <Form.Group controlId="xx">
                <Button variant="primary" onClick={this.onSubmit} style={{ width: '100%' }}>
                  Save
              </Button>
              </Form.Group>
            </Col>

          </Row>
        </Form>
        <br />
      </Container >
    );
  }
}
