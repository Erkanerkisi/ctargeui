import React, { Component } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { data } from "../constant/constant";
import { PlusSquareFill, DashSquareFill } from "react-bootstrap-icons";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail: {
        id: null,
        beanName: null,
        taskName: null,
        lockDuration: null,
        status: "Passive",
        headers: [],
        cron: [],
        body: null,
        depencdency: null,
      },
      errors: [],
      cronInputValues: [{ id: null, cronValue: "" }],
      headerInputValues: [{ id: null, key: "", value: "" }],
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
      this.state.taskDetail.status == null ||
      this.state.taskDetail.status === ""
    ) {
      errors.push("status");
    }
    if (
      this.state.taskDetail.lockDuration == null ||
      this.state.taskDetail.lockDuration === ""
    ) {
      errors.push("lockDuration");
    }

    if (
      this.state.cronInputValues == null ||
      this.state.cronInputValues[0] == null ||
      this.state.cronInputValues[0].cronValue === "" ||
      this.state.cronInputValues[0].cronValue === ""
    ) {
      errors.push("cron");
    }

    this.state.headerInputValues.forEach((e, index) => {
      if ((e.key == null || e.key == "") && e.value !=null && e.value != '') {
        errors.push("header"+index);
      }else if((e.value == null || e.value == "") && e.key !=null && e.key != ''){
        errors.push("header"+index);
      }
    });

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      //İşlemlere başla

      alert("everything good. submit form!");
      console.log("taskDetail : " + this.state.taskDetail.beanName);
      data.push(this.state.taskDetail);
      console.log("taskDetail : " + this.state.taskDetail.beanName);
      console.log("taskDetail : " + this.state.taskDetail.taskName);
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

  handleCronInputChange = (index, event) => {
    const values = [...this.state.cronInputValues];
    values[index].cronValue = event.target.value;
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
      <Container fluid>
        <br />
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Form>
              <Form.Group controlId="taskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("taskName")}
                  label="Task Name"
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

              <Form.Group controlId="beanName">
                <Form.Label>Bean Name</Form.Label>
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
              <Form.Group controlId="status">
                <Form.Label>Task Status</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("status")}
                  name="status"
                  label="Task Status"
                  value={this.state.taskDetail.status}
                  disabled
                />
                <Form.Text className="text-muted">
                  You can change status on Dashboard page.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="cronslabel">
                <Form.Label>Cron Expressions</Form.Label>
              </Form.Group>

              {this.state.cronInputValues.map((input, index) => (
                <Form.Group controlId={"cron" + index}>
                  <Form.Row key={"cron" + index}>
                    <Col xs="auto">
                      <Form.Control
                        isInvalid={this.hasError("cron")}
                        name="cron"
                        placeholder="Cron Expression"
                        onChange={(event) =>
                          this.handleCronInputChange(index, event)
                        }
                        value={input.cronValue}
                      />
                    </Col>
                    <Col xs="auto">
                      <PlusSquareFill
                        size="20"
                        color="green"
                        onClick={() => this.cronInputValuesAddRecord()}
                      />
                      {"       "}
                      <DashSquareFill
                        size="20"
                        color="red"
                        onClick={() => this.cronInputValuesDeleteRecord(index)}
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>
              ))}

              <Form.Group controlId="lockDuration">
                <Form.Label>Lock Duration</Form.Label>
                <Form.Control
                  isInvalid={this.hasError("lockDuration")}
                  name="lockDuration"
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

              <Form.Group controlId="headerslabel">
                <Form.Label>Headers</Form.Label>
              </Form.Group>

              {this.state.headerInputValues.map((input, index) => (
                <Form.Group controlId={"header" + index}>
                  <Form.Row key={"header" + index}>
                    <Col xs="auto">
                      <Form.Control
                        isInvalid={this.hasError("header"+ index)}
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
              ))}

              <Form.Group controlId="body">
                <Form.Label>Request Body</Form.Label>
                <Form.Control
                  placeholder="Request Body"
                  onChange={(e) =>
                    this.setState({
                      taskDetail: {
                        ...this.state.taskDetail,
                        body: { id: null, body: e.target.value },
                      },
                    })
                  }
                  value={
                    this.state.taskDetail.body == null
                      ? null
                      : this.state.taskDetail.body.body
                  }
                />
              </Form.Group>

              <Button variant="primary" onClick={this.onSubmit}>
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
