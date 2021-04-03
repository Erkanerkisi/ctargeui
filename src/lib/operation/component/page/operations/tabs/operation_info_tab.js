import React, { Component } from "react";
import { Card, Button, Accordion, Table, Modal, Form } from "react-bootstrap";
import { TrashFill, PencilFill, PlusCircle } from "react-bootstrap-icons";

export default class OperationInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operationDetail: this.props.operationDetail,
      tmpOperationDetail: this.props.operationDetail,
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
    if (prevProps.operationDetail.id !== this.props.operationDetail.id) {
      this.setState({
        operationDetail: this.props.operationDetail,
        tmpOperationDetail: this.props.operationDetail,
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
      operationDetail: this.state.tmpOperationDetail,
    });
    this.setEditShow(false);
  };

  hasError(key) {
    return this.state.formErrors.indexOf(key) !== -1;
  }

  handleSave = () => {

    let formErrors = [];

    if (
      this.state.tmpOperationDetail.code == null ||
      this.state.tmpOperationDetail.code === ""
    ) {
      formErrors.push("code");
    }
    if (
      this.state.tmpOperationDetail.uri == null ||
      this.state.tmpOperationDetail.uri === ""
    ) {
      formErrors.push("uri");
    }
    if (
      this.state.tmpOperationDetail.method == null ||
      this.state.tmpOperationDetail.method === ""
    ) {
      formErrors.push("method");
    }
    if (
      this.state.tmpOperationDetail.className == null ||
      this.state.tmpOperationDetail.className === ""
    ) {
      formErrors.push("className");
    }
    if (
      this.state.tmpOperationDetail.callSystem == null ||
      this.state.tmpOperationDetail.callSystem === ""
    ) {
      formErrors.push("callSystem");
    }
    if (
      this.state.tmpOperationDetail.updatedUser == null ||
      this.state.tmpOperationDetail.updatedUser === ""
    ) {
      formErrors.push("updatedUser");
    }

    if (
      this.state.tmpOperationDetail.createdUser == null ||
      this.state.tmpOperationDetail.createdUser === ""
    ) {
      formErrors.push("createdUser");
    }
    this.setState({
      formErrors: formErrors,
    });

    if (formErrors.length > 0) {
      return false;
    } else {
      this.setState({
        operationDetail: this.state.tmpOperationDetail,
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
                Operation Information
              </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div>
                <Table responsive>
                  <thead>
                    <tr key={this.state.operationDetail.id}>
                      <th>Id</th>
                      <th>Code</th>
                      <th>Uri</th>
                      <th>Method</th>
                      <th>Class Name</th>
                      <th>Call System</th>
                      <th>Created At</th>
                      <th>Created User</th>
                      <th>Updated At</th>
                      <th>Updated User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={this.state.operationDetail.id}>
                      <td> {this.state.operationDetail.id}</td>
                      <td>{this.state.operationDetail.code}</td>
                      <td>{this.state.operationDetail.uri}</td>
                      <td>{this.state.operationDetail.method}</td>
                      <td>{this.state.operationDetail.className}</td>
                      <td>{this.state.operationDetail.callSystem}</td>
                      <td>{this.state.operationDetail.createdAt}</td>
                      <td>{this.state.operationDetail.createdUser}</td>
                      <td>{this.state.operationDetail.updatedAt}</td>
                      <td>{this.state.operationDetail.updatedUser}</td>
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
            <Modal.Title>Edit Operation Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Id</Form.Label>
                <Form.Control disabled value={this.state.operationDetail.id} />
              </Form.Group>

              <Form.Group controlId="code">
                <Form.Label>code</Form.Label>
                <Form.Control
                  placeholder="Enter Code Name"
                  isInvalid={this.hasError("code")}
                  onChange={(e) =>
                    this.setState({
                      tmpOperationDetail: {
                        ...this.state.tmpOperationDetail,
                        code: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpOperationDetail.code}
                />
              </Form.Group>

              <Form.Group controlId="uri">
                <Form.Label>Uri</Form.Label>
                <Form.Control
                  label="Uri"
                  isInvalid={this.hasError("uri")}
                  name="uri"
                  onChange={(e) =>
                    this.setState({
                      tmpOperationDetail: {
                        ...this.state.tmpOperationDetail,
                        uri: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpOperationDetail.uri}
                />
              </Form.Group>
              <Form.Group controlId="method">
                <Form.Label>method</Form.Label>
                <Form.Control
                  label="method"
                  placeholder="method"
                  isInvalid={this.hasError("method")}
                  onChange={(e) =>
                    this.setState({
                      tmpOperationDetail: {
                        ...this.state.tmpOperationDetail,
                        method: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpOperationDetail.method}
                />
              </Form.Group>
              <Form.Group controlId="className">
                <Form.Label>className</Form.Label>
                <Form.Control
                  label="className"
                  placeholder="className"
                  isInvalid={this.hasError("className")}
                  onChange={(e) =>
                    this.setState({
                      tmpOperationDetail: {
                        ...this.state.tmpOperationDetail,
                        className: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpOperationDetail.className}
                />
              </Form.Group>

              <Form.Group controlId="callSystem">
                <Form.Label>callSystem</Form.Label>
                <Form.Control
                  placeholder="callSystem"
                  isInvalid={this.hasError("callSystem")}
                  onChange={(e) =>
                    this.setState({
                      tmpOperationDetail: {
                        ...this.state.tmpOperationDetail,
                        callSystem: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpOperationDetail.callSystem}
                />
              </Form.Group>
              <Form.Group controlId="createdUser">
                <Form.Label>createdUser</Form.Label>
                <Form.Control
                  placeholder="createdUser"
                  isInvalid={this.hasError("createdUser")}
                  onChange={(e) =>
                    this.setState({
                      tmpOperationDetail: {
                        ...this.state.tmpOperationDetail,
                        createdUser: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpOperationDetail.createdUser}
                />
              </Form.Group>
              <Form.Group controlId="updatedUser">
                <Form.Label>updatedUser</Form.Label>
                <Form.Control
                  placeholder="updatedUser"
                  isInvalid={this.hasError("updatedUser")}
                  onChange={(e) =>
                    this.setState({
                      tmpOperationDetail: {
                        ...this.state.tmpOperationDetail,
                        updatedUser: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpOperationDetail.updatedUser}
                />
              </Form.Group>
            </Form>
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
