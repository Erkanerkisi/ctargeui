import { Button, Alert } from "react-bootstrap";
import React, { Component } from "react";
import TaskInfoTab from "./tabs/task_info_tab";
import HeaderInfoTab from "./tabs/header_info_tab";
import CronInfoTab from "./tabs/cron_info_tab";
import RequestBodyInfoTab from "./tabs/request_body_info_tab";
import { updateTask } from "../../../network/network";

const errorMessage = "Task update is failed!";
const successMessage = "Task has been successfully updated!";


export default class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorAlert: false,
      showSuccessAlert: false,
    };
    
    this.saveTask = this.saveTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.taskInfoRef = React.createRef();
    this.headersRef = React.createRef();
    this.cronsRef = React.createRef();
    this.requestBodyRef = React.createRef();


  }

  saveTask = async () =>  {
    var taskDetailReq = {
      id: this.taskInfoRef.current.state.taskDetail.id,
      beanName: this.taskInfoRef.current.state.taskDetail.beanName,
      taskName: this.taskInfoRef.current.state.taskDetail.taskName,
      maxLockDuration: this.taskInfoRef.current.state.taskDetail.maxLockDuration,
      status: this.taskInfoRef.current.state.taskDetail.status,
      pathValue: this.taskInfoRef.current.state.taskDetail.pathValue,
      finishTaskId: this.taskInfoRef.current.state.taskDetail.finishTaskId,
      requestHeaders: this.headersRef.current.state.taskDetail.requestHeaders,
      crons: this.cronsRef.current.state.taskDetail.crons,
      requestBody: this.requestBodyRef.current.state.taskDetail.requestBody,
    } 
    var response = await updateTask(taskDetailReq);
    if (response.httpStatusCode == 200) {
      this.showSuccessAlert(true);
    } else {
      this.showErrorAlert(true);
    }    
  }

  deleteTask = async () => {

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
        <h3>Task Details</h3>
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
        <TaskInfoTab ref = {this.taskInfoRef} taskDetail={this.props.taskDetail} />
        <br />
        <HeaderInfoTab ref = {this.headersRef} taskDetail={this.props.taskDetail} />
        <br />
        <CronInfoTab ref = {this.cronsRef} taskDetail={this.props.taskDetail} />
        <br />
        <RequestBodyInfoTab ref = {this.requestBodyRef} taskDetail={this.props.taskDetail} />
        <br />
        <Button size="lg" variant="primary" onClick = {this.saveTask}>
          Save Task
        </Button>{" "}
        <Button size="lg" variant="danger" onClick = {this.deleteTask}>
          Delete Task
        </Button>{" "}
      </div>
    );
  }
}
