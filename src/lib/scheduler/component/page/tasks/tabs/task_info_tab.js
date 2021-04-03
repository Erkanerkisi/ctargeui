import React, { Component } from "react";
import { Card, Button, Accordion, Table, Modal, Form } from "react-bootstrap";
import { TrashFill, PencilFill, PlusCircle } from "react-bootstrap-icons";

export default class TaskInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail: this.props.taskDetail,
      tmpTaskDetail: this.props.taskDetail,
      isOpenDeleteModal: false,
      isOpenEditModal: false,
      formErrors: [],
    };
    this.setDeleteShow = this.setDeleteShow.bind(this);
    this.setEditShow = this.setEditShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskDetail.id !== this.props.taskDetail.id) {
      this.setState({
        taskDetail: this.props.taskDetail,
        tmpTaskDetail: this.props.taskDetail,
      });
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
      taskDetail: this.state.tmpTaskDetail,
    });
    this.setEditShow(false);
  };

  hasError(key) {
    return this.state.formErrors.indexOf(key) !== -1;
  }

  handleSave = () => {

    let formErrors = [];

    if (
      this.state.tmpTaskDetail.taskName == null ||
      this.state.tmpTaskDetail.taskName === ""
    ) {
      formErrors.push("taskName");
    }
    if (
      this.state.tmpTaskDetail.beanName == null ||
      this.state.tmpTaskDetail.beanName === ""
    ) {
      formErrors.push("beanName");
    }
    if (
      this.state.tmpTaskDetail.pathValue == null ||
      this.state.tmpTaskDetail.pathValue === ""
    ) {
      formErrors.push("pathValue");
    }
    if (
      this.state.tmpTaskDetail.status == null ||
      this.state.tmpTaskDetail.status === ""
    ) {
      formErrors.push("status");
    }
    if (
      this.state.tmpTaskDetail.maxLockDuration == null ||
      this.state.tmpTaskDetail.maxLockDuration === ""
    ) {
      formErrors.push("maxLockDuration");
    }

    if (
      this.state.tmpTaskDetail.beanName != null &&
      this.state.tmpTaskDetail.beanName == "finishScheduler" &&
      (this.state.tmpTaskDetail.finishTaskId == null ||
        this.state.tmpTaskDetail.finishTaskId === "")
    ) {
      formErrors.push("finishTaskId");
    }

    this.setState({
      formErrors: formErrors,
    });

    if (formErrors.length > 0) {
      return false;
    } else {
      this.setState({
        taskDetail: this.state.tmpTaskDetail,
      });
      this.setEditShow(false);
    }
  };

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
                      <th>Path Value</th>
                      <th>Status</th>
                      <th>Max Lock Duration</th>
                      <th>Finish Task Id</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={this.state.taskDetail.id}>
                      <td> {this.state.taskDetail.id}</td>
                      <td>{this.state.taskDetail.beanName}</td>
                      <td>{this.state.taskDetail.taskName}</td>
                      <td>{this.state.taskDetail.pathValue}</td>
                      <td>{this.state.taskDetail.status}</td>
                      <td>{this.state.taskDetail.maxLockDuration}</td>
                      <td>{this.state.taskDetail.finishTaskId}</td>
                      <td>
                        <Button
                          onClick={() => this.setEditShow(true)}
                          variant="outline-info"
                        >
                          <PencilFill />
                        </Button>{" "}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                {/* <PlusCircle /> */}
              </div>
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
            <Modal.Title>Edit Task Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Id</Form.Label>
                <Form.Control disabled value={this.state.taskDetail.id} />
              </Form.Group>

              <Form.Group controlId="beanName">
                <Form.Label>Bean Name</Form.Label>
                <Form.Control
                  placeholder="Enter Bean Name"
                  isInvalid={this.hasError("beanName")}
                  onChange={(e) =>
                    this.setState({
                      tmpTaskDetail: {
                        ...this.state.tmpTaskDetail,
                        beanName: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpTaskDetail.beanName}
                />
              </Form.Group>

              <Form.Group controlId="taskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  label="Task Name"
                  isInvalid={this.hasError("taskName")}
                  name="taskName"
                  onChange={(e) =>
                    this.setState({
                      tmpTaskDetail: {
                        ...this.state.tmpTaskDetail,
                        taskName: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpTaskDetail.taskName}
                />
              </Form.Group>
              <Form.Group controlId="pathValue">
                <Form.Label>Path Value</Form.Label>
                <Form.Control
                  label="Path Value"
                  placeholder="Path Value"
                  isInvalid={this.hasError("pathValue")}
                  onChange={(e) =>
                    this.setState({
                      tmpTaskDetail: {
                        ...this.state.tmpTaskDetail,
                        pathValue: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpTaskDetail.pathValue}
                />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  isInvalid={this.hasError("status")}
                  id="inlineFormCustomSelect"
                  custom
                  value={this.state.tmpTaskDetail.status}
                  onChange={(e) =>
                    this.setState({
                      tmpTaskDetail: {
                        ...this.state.tmpTaskDetail,
                        status: e.target.value,
                      },
                    })
                  }
                >
                  <option value="Passive">Passive</option>
                  <option value="Active">Active</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="maxLockDuration">
                <Form.Label>Max Lock Duration</Form.Label>
                <Form.Control
                  placeholder="Max Lock Duration"
                  isInvalid={this.hasError("maxLockDuration")}
                  onChange={(e) =>
                    this.setState({
                      tmpTaskDetail: {
                        ...this.state.tmpTaskDetail,
                        maxLockDuration: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpTaskDetail.maxLockDuration}
                />
              </Form.Group>
            </Form>
            <Form.Group controlId="finishTaskId">
                <Form.Label>Finish Task Id</Form.Label>
                <Form.Control
                  label="Finish Task Id"
                  placeholder="Finish Task Id"
                  isInvalid={this.hasError("finishTaskId")}
                  onChange={(e) =>
                    this.setState({
                      tmpTaskDetail: {
                        ...this.state.tmpTaskDetail,
                        finishTaskId: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpTaskDetail.finishTaskId}
                />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
