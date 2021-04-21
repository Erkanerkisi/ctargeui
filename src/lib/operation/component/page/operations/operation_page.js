import React, { Component } from "react";
import { Container, Row, Col, ListGroup,Alert } from "react-bootstrap";
import Welcome from "../../welcome";
import SchSpinner from "../../spinner";
import { getOperations } from "../../../network/network";
import OperationDetail from "./operation_detail";

export default class OperationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
      selectedOperation: null,
      activeOperationId: 0,
      isLoading: true,
      serviceError: false,
    };
    this.onOperationSelect = this.onOperationSelect.bind(this);
  }
  
  componentDidMount() {
    getOperations().then((res)=> {
      
      if (res.httpStatusCode == 200) {
        this.setState({ operations: res.body, isLoading: false });
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
        <OperationDetail operationDetail={this.state.selectedOperation}></OperationDetail>
      );
    }

    return operationDetail;
  }

  
  renderBody() {
    return (
      <Container fluid>
        <br />
        <Row>
          <Col xs={3} className="justify-content-md-center">
            <h3 className="text-center">Operations</h3>
            <ListGroup style = {{maxHeight : window.innerHeight - 150 + 'px',overflow:'scroll'}}>
              {this.state.operations.map((index) => {
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
        <br/>
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
