import { Card, Button, Accordion, Table, Modal } from "react-bootstrap";
import React, { Component } from "react";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import TaskInfoTab from "./tabs/task_info_tab";
import HeaderInfoTab from "./tabs/header_info_tab";
import CronInfoTab from "./tabs/cron_info_tab";
import RequestBodyInfoTab from "./tabs/request_body_info_tab";


export default class TaskDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("taskDetail : " + this.props.taskDetail.taskName);
    return (
      <div>
        <TaskInfoTab taskDetail = {this.props.taskDetail}/>
        <br />
        <HeaderInfoTab taskDetail = {this.props.taskDetail}/>
        <br />
        <CronInfoTab taskDetail = {this.props.taskDetail}/>
        <br />
        <RequestBodyInfoTab taskDetail = {this.props.taskDetail}/>
        <br />
        <Button size="lg" variant="primary">
          Save Task
        </Button>{" "}
        <Button size="lg" variant="danger">
          Delete Task
        </Button>{" "}
      </div>
    );
  }
}
