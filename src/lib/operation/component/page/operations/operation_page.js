import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import Welcome from "../../welcome";
import SchSpinner from "../../spinner";
import { getOperations } from "../../../network/network";
import OperationDetail from "./operation_detail";
import { Search } from "react-bootstrap-icons";

export default class OperationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
      selectedOperation: null,
      activeOperationId: 0,
      isLoading: true,
      serviceError: false,
      filteredOperations: [],
    };
    this.onOperationSelect = this.onOperationSelect.bind(this);
  }

  componentDidMount() {
    getOperations().then((res) => {
      if (res.httpStatusCode == 200) {
        this.setState({
          filteredOperations: res.body,
          operations: res.body,
          isLoading: false,
        });
      } else {
        this.setState({ serviceError: true, isLoading: false });
      }
    });
  }

  onOperationSelect = (op) => {
    this.setState({
      selectedOperation: op,
    });
  };
  renderOperationDetail() {
    var operationDetail;
    if (this.state.selectedOperation == null) {
      operationDetail = <Welcome />;
    } else {
      operationDetail = (
        <OperationDetail
          operationDetail={this.state.selectedOperation}
        ></OperationDetail>
      );
    }

    return operationDetail;
  }

  onSearchTextChanged = (e) => {
    var filterText =
      e.target.value != null ? e.target.value.toLowerCase() : e.target.value;
    var filteredOperations = this.state.operations.filter((fil) =>
      fil.code.toLowerCase().includes(filterText)
    );
    this.setState({
      filteredOperations: filteredOperations,
    });
  };

  renderBody() {
    return (
      <Container fluid>
        <br />
        <Row>
          <Col xs={3} className="justify-content-md-center">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                label="search"
                placeholder="Search"
                name="search"
                onChange={this.onSearchTextChanged}
              />
            </InputGroup>

            <h3 className="text-center">Operations</h3>
            <ListGroup
              style={{
                maxHeight: window.innerHeight - 150 + "px",
                overflow: "scroll",
              }}
            >
              {this.state.filteredOperations.map((index) => {
                return (
                  <ListGroup.Item
                    active={
                      this.state.selectedOperation != null &&
                      index.id == this.state.selectedOperation.id
                    }
                    key={index.id}
                    onClick={() => this.onOperationSelect(index)}
                  >
                    {index.code}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>

          <Col xs={9}>{this.renderOperationDetail()}</Col>
        </Row>
        <br />
      </Container>
    );
  }

  render() {
    if (this.state.isLoading) {
      return <SchSpinner />;
    } else if (this.state.serviceError) {
      return (
        <Container>
          <br />
          <Alert key={1} variant="danger" dismissible>
            Could not load data from service
          </Alert>
        </Container>
      );
    } else {
      return this.renderBody();
    }
  }
}
