import React, { Component } from "react";
import { Card, Button, Accordion, Table, Modal, Form } from "react-bootstrap";
import { TrashFill, PencilFill, PlusCircle } from "react-bootstrap-icons";

export default class HeaderInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail: this.props.taskDetail,
      tmpHeader: { id: 0, key: "", value: "" },
      isOpenDeleteModal: false,
      isOpenEditModal: false,
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
      });
    }
  }

  setDeleteShow = (val, header) => {
    this.setState({
      isOpenDeleteModal: val,
      tmpHeader: header,
    });
  };
  setEditShow = (val, header) => {
    this.setState({
      isOpenEditModal: val,
      tmpHeader: header,
    });
  };

  handleClose = () => {
    this.setState({
      isOpenDeleteModal: false,
    });
  };

  handleEditClose = () => {
    this.setState({
      isOpenEditModal: false,
    });
  };

  handleSave = () => {
    
    var index = this.state.taskDetail.headers.findIndex(e => e.id == this.state.tmpHeader.id);
    var _headers = [...this.state.taskDetail.headers];
    _headers[index] = this.state.tmpHeader;
    
    this.setState({
      taskDetail: { ...this.state.taskDetail, headers: _headers},
      isOpenEditModal: false
    });
  };

  render() {
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Header Information
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Table responsive>
                <thead>
                  <tr key={this.state.taskDetail.id}>
                    <th>id</th>
                    <th>Header Name</th>
                    <th>Header Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.taskDetail.headers.map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.key}</td>
                        <td>{e.value}</td>
                        <td>
                          <Button
                            onClick={() => this.setEditShow(true, e)}
                            variant="info"
                          >
                            <PencilFill />
                          </Button>{" "}
                          <Button
                            onClick={() => this.setDeleteShow(true, e)}
                            variant="danger"
                          >
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
                <Form.Control disabled value={this.state.tmpHeader.id} />
              </Form.Group>

              <Form.Group controlId="headerKey">
                <Form.Label>Header Key</Form.Label>
                <Form.Control
                  placeholder="Enter Header Key"
                  onChange={(e) =>
                    this.setState({
                      tmpHeader: {
                        ...this.state.tmpHeader,
                        key: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpHeader.key}
                />
              </Form.Group>

              <Form.Group controlId="headerValue">
                <Form.Label>Header Value</Form.Label>
                <Form.Control
                  label="Header Value"
                  onChange={(e) =>
                    this.setState({
                      tmpHeader: {
                        ...this.state.tmpHeader,
                        value: e.target.value,
                      },
                    })
                  }
                  value={this.state.tmpHeader.value}
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
