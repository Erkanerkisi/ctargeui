import React, { Component } from "react";
import { Card, Button, Accordion, Table, Modal, Form } from "react-bootstrap";
import { TrashFill, PencilFill, PlusCircle } from "react-bootstrap-icons";

export default class CronInfoTab extends Component {
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

  render() {
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Cron Value Information
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Table responsive>
                <thead>
                  <tr key={this.props.taskDetail.id}>
                    <th>id</th>
                    <th>Cron Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.taskDetail.cron.map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.cronValue}</td>
                        <td>
                          <Button onClick={() => this.setEditShow(true)}  variant="info">
                            <PencilFill />
                          </Button>{" "}
                          <Button onClick={() => this.setDeleteShow(true)} variant="danger">
                            <TrashFill />
                          </Button>{" "}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <Modal show={this.state.isOpenDeleteModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isOpenEditModal} onHide={this.handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Id</Form.Label>
                <Form.Control disabled value = {this.state.taskDetail.id}/>
              </Form.Group>

              <Form.Group controlId="beanName">
                <Form.Label>Bean Name</Form.Label>
                <Form.Control placeholder="Enter Bean Name"
                onChange={e => this.setState({
                    tmpTaskDetail: {
                        ...this.state.tmpTaskDetail, beanName: e.target.value
                    }
                })}
                value = {this.state.tmpTaskDetail.beanName}/>
              </Form.Group>

              <Form.Group controlId="taskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control 
                label="Task Name"
                onChange={e => this.setState({
                    tmpTaskDetail: {
                        ...this.state.tmpTaskDetail, taskName: e.target.value
                    }
                })}
                value = {this.state.tmpTaskDetail.taskName}/>
              </Form.Group>

              <Form.Group controlId="lockDuration">
                <Form.Label>Lock Duration</Form.Label>
                <Form.Control placeholder="Lock Duration" 
                onChange={e => this.setState({
                    tmpTaskDetail: {
                        ...this.state.tmpTaskDetail, lockDuration: e.target.value
                    }
                })}
                value = {this.state.tmpTaskDetail.lockDuration}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={this.handleEditClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
