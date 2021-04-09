import React, { Component } from "react";
import { Form, Row, Col, Container, Button, Alert } from "react-bootstrap";
import { addOperation } from "../../../network/network";
import { PlusSquareFill, DashSquareFill } from "react-bootstrap-icons";
import Files from "react-files";
const errorMessage = "Creation of task has failed!";
const successMessage = "Task has been successfully created!";

export default class CreateOperationFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [
        {
          id: null,
          code: null,
          testuri: null,
          prepuri: null,
          produri: null,
          method: null,
          className: null,
          callSystem: null,
          user: null,
        },
      ],
      operationDetail: {
        id: null,
        code: null,
        testuri: null,
        prepuri: null,
        produri: null,
        method: null,
        className: null,
        callSystem: null,
        user: null,
      },
      jsonFile:null
    };
    this.onExportSubmit = this.onExportSubmit.bind(this);
    this.onImportSubmit = this.onImportSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.opInputValuesAddRecord = this.opInputValuesAddRecord.bind(this);
    this.opInputValuesDeleteRecord = this.opInputValuesDeleteRecord.bind(this);

    this.fileReader = new FileReader();

    this.fileReader.onload = (event) => {
      this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
        this.setState({operations: this.state.jsonFile});
      });
    };
  }

  handleInputChange = (index, event) => {
    const values = [...this.state.operations];
    if (event.target.name === "id") {
      values[index].id = event.target.value;
    } else if (event.target.name === "code") {
      values[index].code = event.target.value;
    } else if (event.target.name === "testuri") {
      values[index].testuri = event.target.value;
    } else if (event.target.name === "method") {
      values[index].method = event.target.value;
    } else if (event.target.name === "className") {
      values[index].className = event.target.value;
    } else if (event.target.name === "callSystem") {
      values[index].callSystem = event.target.value;
    } else if (event.target.name === "user") {
      values[index].user = event.target.value;
    }
    this.setState({
      operations: values,
    });
  };

  opInputValuesAddRecord = () => {
    const values = [...this.state.operations];
    values.push({
      id: null,
      code: null,
      testuri: null,
      prepuri: null,
      produri: null,
      method: null,
      className: null,
      callSystem: null,
      user: null,
    });
    this.setState({
      operations: values,
    });
  };

  opInputValuesDeleteRecord = (index) => {
    const values = [...this.state.operations];
    values.splice(index, 1);
    this.setState({
      operations: values,
    });
  };
  onExportSubmit = () => {
    var data = JSON.stringify(this.state.operations);
    const element = document.createElement("a");
    const file = new Blob([data], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "Operation-export-file.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  onImportSubmit = () => {
    this.upload.click();
  };

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    this.fileReader.readAsText(event.target.files[0]);
  }

  render() {
    return (
      <Container fluid style={{ padding: 5, overflow: "scroll" }}>
        {this.state.operations.map((input, index) => (
          <Row
            style={{
              padding: 5,
              width: "100%",
              display: "flex",
              flexWrap: "nowrap",
              flexGrow: "1",
            }}
          >
            <Col xs={0.6} style={{ paddingLeft: 15 }}>
              <PlusSquareFill
                size="20"
                color="green"
                onClick={() => this.opInputValuesAddRecord()}
              />{" "}
              <DashSquareFill
                size="20"
                color="red"
                onClick={() => this.opInputValuesDeleteRecord(index)}
              />
            </Col>
            <Col xs={1}>
              <Form.Control
                label="id"
                placeholder="id"
                name="id"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.id}
              />
            </Col>
            <Col xs={3}>
              <Form.Control
                label="code"
                placeholder="code"
                name="code"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.code}
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                label="testuri"
                placeholder="test uri"
                name="testuri"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.testuri}
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                label="prepuri"
                placeholder="prep uri"
                name="prepuri"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.prepuri}
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                label="produri"
                placeholder="prod uri"
                name="produri"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.produri}
              />
            </Col>
            <Col xs={1}>
              <Form.Control
                label="method"
                placeholder="method"
                name="method"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.method}
              />
            </Col>
            <Col xs={1}>
              <Form.Control
                label="className"
                placeholder="className"
                name="className"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.className}
              />
            </Col>
            <Col xs={1}>
              <Form.Control
                label="callSystem"
                placeholder="callSystem"
                name="callSystem"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.callSystem}
              />
            </Col>
            <Col xs={1}>
              <Form.Control
                label="user"
                placeholder="user"
                name="user"
                onChange={(event) => this.handleInputChange(index, event)}
                value={input.user}
              />
            </Col>
          </Row>
        ))}
        <Row className="justify-content-md-center">
          <Col xs={2}>
            <Form.Group controlId="xx">
              <Button
                variant="primary"
                onClick={this.onExportSubmit}
                style={{ width: "100%" }}
              >
                Export
              </Button>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Form.Group controlId="xx">
              <Button
                variant="primary"
                onClick={this.onImportSubmit}
                style={{ width: "100%" }}
              >
                Import
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <input
          id="myInput"
          type="file"
          ref={(ref) => (this.upload = ref)}
          style={{ display: "none" }}
          onChange={this.onChangeFile.bind(this)}
        />
      </Container>
    );
  }
}
