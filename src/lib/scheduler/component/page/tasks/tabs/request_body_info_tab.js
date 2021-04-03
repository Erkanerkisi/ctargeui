import React, { Component } from "react";
import { Card, Button, Accordion, Table, Modal, Form } from "react-bootstrap";
import { TrashFill, PencilFill, PlusCircle } from "react-bootstrap-icons";

export default class RequestBodyInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail : this.props.taskDetail,
      tmpRequestBody : { id: null, body: null},
      isOpenDeleteModal: false,
      isOpenEditModal: false,
      formErrors: [],
    };
    this.setDeleteShow = this.setDeleteShow.bind(this);
    this.setEditShow = this.setEditShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.newRecordShow = this.newRecordShow.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskDetail.id !== this.props.taskDetail.id) {
      this.setState({
        taskDetail : this.props.taskDetail,
      })
    }
  }

  hasError(key) {
    return this.state.formErrors.indexOf(key) !== -1;
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
        isOpenEditModal: false
    })      
  };

  handleSave = () => {

    let formErrors = [];

    if (
      this.state.tmpRequestBody == null ||
      this.state.tmpRequestBody.body == null ||
      this.state.tmpRequestBody.body === ""
    ) {
      formErrors.push("body");
    }

    this.setState({
      formErrors: formErrors,
    });

    if (formErrors.length > 0) {
      return false;
    } else {
      this.setState({
        taskDetail :{...this.state.taskDetail,requestBody: this.state.tmpRequestBody},
        isOpenEditModal: false
    })
    }
  };

  
  handleDelete = () => {
    this.setState({
      taskDetail :{...this.state.taskDetail,requestBody: null},
      isOpenDeleteModal: false
  })
  };

  newRecordShow = (val) => {
    this.setState({
      isOpenEditModal: val,
      tmpRequestBody: { id: null, body: null},
    });
  }


  render() {
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1" style={{ color : '#0275d8', fontSize: 18}}>
                Request Body Information
              </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Table responsive borderless>
                <thead>
                  <tr key={this.state.taskDetail.id}>
                    <th>id</th>
                    <th>body</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.taskDetail.requestBody != null && (
                    <tr key={this.state.taskDetail.requestBody.id}>
                      <td>{this.state.taskDetail.requestBody.id}</td>
                      <td>{this.state.taskDetail.requestBody.body}</td>
                      <td>
                        <Button onClick={() => this.setEditShow(true)} variant="outline-info">
                          <PencilFill />
                        </Button>{" "}
                        <Button onClick={() => this.setDeleteShow(true)} variant="outline-danger">
                          <TrashFill />
                        </Button>{" "}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Button onClick={() => this.newRecordShow(true)} variant="success">New Body</Button>
                </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <Modal show={this.state.isOpenDeleteModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isOpenEditModal} onHide={this.handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Request Body Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Id</Form.Label>
                <Form.Control disabled value = {this.state.tmpRequestBody.id}/>
              </Form.Group>

              <Form.Group controlId="body">
                <Form.Label>Request Body</Form.Label>
                <Form.Control placeholder="Enter Request Body"
                 isInvalid={this.hasError("body")}
                onChange={e => this.setState({
                  tmpRequestBody: {
                        ...this.state.tmpRequestBody, body: e.target.value
                    }
                })}
                value = {this.state.tmpRequestBody.body}/>
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
