import React, { Component } from "react";
import { Card, Button, Accordion, Table, Modal, Form } from "react-bootstrap";
import { TrashFill, PencilFill, PlusCircle } from "react-bootstrap-icons";

export default class ScheduledTaskInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail : this.props.taskDetail,
      tmpTaskDetail : this.props.taskDetail,
      isOpenDeleteModal: false,
      isOpenEditModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskDetail.id !== this.props.taskDetail.id) {
      this.setState({
        taskDetail : this.props.taskDetail,
        tmpTaskDetail: this.props.taskDetail
      })
    }
  }
  

  render() {
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0" style={{ color : '#0275d8', fontSize: 18}}>
                Task Information
              </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div>
                <Table responsive>
                  <thead>
                    <tr key={this.state.taskDetail.id}>
                      <th>id</th>
                      <th>Bean Name</th>
                      <th>Task Name</th>
                      <th>Status</th>
                      <th>Max Lock Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={this.state.taskDetail.id}>
                      <td> {this.state.taskDetail.id}</td>
                      <td>{this.state.taskDetail.beanName}</td>
                      <td>{this.state.taskDetail.taskName}</td>
                      <td>{this.state.taskDetail.status}</td>
                      <td>{this.state.taskDetail.maxLockDuration}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
