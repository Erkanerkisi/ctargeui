import React, { Component } from "react";
import { Card, Button, Accordion, Table, Modal, Form } from "react-bootstrap";
import { TrashFill, PencilFill, PlusCircle } from "react-bootstrap-icons";

export default class ScheduledHeaderInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail: this.props.taskDetail,
      tmpHeader: { id: null, key: "", value: "" },
      isOpenDeleteModal: false,
      isOpenEditModal: false,
    };
    this.setDeleteShow = this.setDeleteShow.bind(this);
    this.setEditShow = this.setEditShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.newRecordShow = this.newRecordShow.bind(this);
    
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

  
  handleDelete = () => {
    var index = this.state.taskDetail.requestHeaders.findIndex(e => e.id == this.state.tmpHeader.id);
    var _headers = [...this.state.taskDetail.requestHeaders];
    _headers.splice(index, 1);
    this.setState({
      taskDetail: { ...this.state.taskDetail, headers: _headers},
      isOpenDeleteModal: false
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
    var _headers = [...this.state.taskDetail.requestHeaders];

    if(this.state.tmpHeader.id != null) {
      var index = this.state.taskDetail.requestHeaders.findIndex(e => e.id == this.state.tmpHeader.id);  
      _headers[index] = this.state.tmpHeader;
    } else {
      _headers.push(this.state.tmpHeader);
    }
    
    this.setState({
      taskDetail: { ...this.state.taskDetail, headers: _headers},
      isOpenEditModal: false
    });
  };

  newRecordShow = (val) => {
    this.setState({
      isOpenEditModal: val,
      tmpHeader: { id: null, key: "", value: "" },
    });
  }

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
            <Card.Body>
              <Table responsive borderless>
                <thead>
                  <tr key={this.state.taskDetail.id}>
                    <th>id</th>
                    <th>Header Name</th>
                    <th>Header Value</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.taskDetail.requestHeaders.map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.key}</td>
                        <td>{e.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
                </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
