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
    this.setDeleteShow = this.setDeleteShow.bind(this);
    this.setEditShow = this.setEditShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleSave = this.handleSave.bind(this);

    console.log("TaskInfoTab taskDetail : " + this.props.taskDetail.taskName);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskDetail.id !== this.props.taskDetail.id) {
      this.setState({
        taskDetail : this.props.taskDetail,
        tmpTaskDetail: this.props.taskDetail
      })
    }
  }
  
  setDeleteShow = (val) => {
    this.setState({
      isOpenDeleteModal: val,
    });
  };
  setEditShow = (val) => {
    this.setState({
      isOpenEditModal: val,
    });
  };

  handleClose = () => {
    this.setDeleteShow(false);
  };

  handleEditClose = () => {
    this.setState({
        taskDetail : this.state.tmpTaskDetail
    })      
    this.setEditShow(false);
  };

  handleSave = () => {
    this.setState({
        taskDetail : this.state.tmpTaskDetail
    })      
    this.setEditShow(false);
  };


  render() {
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Task Information
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <div>
                <Table responsive>
                  <thead>
                    <tr key={this.state.taskDetail.id}>
                      <th>id</th>
                      <th>Bean Name</th>
                      <th>Task Name</th>
                      <th>Status</th>
                      <th>Lock Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={this.state.taskDetail.id}>
                      <td> {this.state.taskDetail.id}</td>
                      <td>{this.state.taskDetail.beanName}</td>
                      <td>{this.state.taskDetail.taskName}</td>
                      <td>{this.state.taskDetail.status}</td>
                      <td>{this.state.taskDetail.lockDuration}</td>
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
