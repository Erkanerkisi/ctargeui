import React, { Component } from "react";
import ScheduledTaskInfoTab from "./tabs/scheduled_task_info_tab";
import ScheduledHeaderInfoTab from "./tabs/scheduled_header_info_tab";
import ScheduledCronInfoTab from "./tabs/scheduled_cron_info_tab";
import ScheduledRequestBodyInfoTab from "./tabs/scheduled_request_body_info_tab";

export default class ScheduledTaskDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>
          Scheduled Task Details
        </h3>
        <ScheduledTaskInfoTab taskDetail={this.props.taskDetail} />
        <br />
        <ScheduledHeaderInfoTab taskDetail={this.props.taskDetail} />
        <br />
        <ScheduledCronInfoTab taskDetail={this.props.taskDetail} />
        <br />
        <ScheduledRequestBodyInfoTab taskDetail={this.props.taskDetail} />
        <br />
      </div>
    );
  }
}
