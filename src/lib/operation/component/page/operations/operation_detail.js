import { Button, Alert } from "react-bootstrap";
import React, { Component } from "react";
import OperationInfoTab from "./tabs/operation_info_tab";
import { updateOperation } from "../../../network/network";

const errorMessage = "Operation update is failed!";
const successMessage = "Operation has been successfully updated!";


export default class OperationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorAlert: false,
      showSuccessAlert: false,
    };
    
    this.saveOperation = this.saveOperation.bind(this);
    this.deleteOperation = this.deleteOperation.bind(this);
    this.operationInfoRef = React.createRef();
  }
  
  deleteOperation = async () => {

  }

  saveOperation = async () =>  {
    var operationDetailReq = {
      id: this.operationInfoRef.current.state.operationDetail.id,
      code: this.operationInfoRef.current.state.operationDetail.code,
      uri: this.operationInfoRef.current.state.operationDetail.uri,
      method: this.operationInfoRef.current.state.operationDetail.method,
      className: this.operationInfoRef.current.state.operationDetail.className,
      callSystem: this.operationInfoRef.current.state.operationDetail.callSystem,
      createdUser: this.operationInfoRef.current.state.operationDetail.createdUser,
      updatedUser: this.operationInfoRef.current.state.operationDetail.updatedUser,
    } 
    var response = await updateOperation(operationDetailReq);
    if (response.httpStatusCode == 200) {
      this.showSuccessAlert(true);
    } else {
      this.showErrorAlert(true);
    }    
  }

  showSuccessAlert = (val) => {
    this.setState({ showSuccessAlert: val });
  };
  showErrorAlert = (val) => {
    this.setState({ showErrorAlert: val });
  };

  render() {
    return (
      <div>
        <h3>Operation Details</h3>
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
        <OperationInfoTab ref = {this.operationInfoRef} operationDetail={this.props.operationDetail} />
        <br />
        <Button size="lg" variant="primary" onClick = {this.saveOperation}>
          Save Operation
        </Button>{" "}
        <Button className="float-right" size="lg" variant="danger" onClick = {this.deleteOperation}>
          Delete Operation
        </Button>{" "}
        <br />
      </div>
    );
  }
}
