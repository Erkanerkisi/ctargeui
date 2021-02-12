import React, { Component } from "react";
import { Card, Button, Accordion, Table, Modal, Form } from "react-bootstrap";
import { TrashFill, PencilFill, PatchPlusFill } from "react-bootstrap-icons";

export default class ScheduledCronInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail: this.props.taskDetail,
      tmpCron: { id: null, cronValue: null },
      isOpenDeleteModal: false,
      isOpenEditModal: false,
    };
    this.setDeleteShow = this.setDeleteShow.bind(this);
    this.setEditShow = this.setEditShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.newRecordShow = this.newRecordShow.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskDetail.id !== this.props.taskDetail.id) {
      this.setState({
        taskDetail: this.props.taskDetail,
      });
    }
  }

  setDeleteShow = (val, cron) => {
    this.setState({
      isOpenDeleteModal: val,
      tmpCron: cron,
    });
  };
  setEditShow = (val, cron) => {
    this.setState({
      isOpenEditModal: val,
      tmpCron: cron,
    });
  };

  handleClose = () => {
    this.setState({
      isOpenDeleteModal: false,
    });
  };

  handleDelete = () => {
    var index = this.state.taskDetail.crons.findIndex(
      (e) => e.id == this.state.tmpCron.id
    );
    var _crons = [...this.state.taskDetail.crons];
    _crons.splice(index, 1);
    this.setState({
      taskDetail: { ...this.state.taskDetail, cron: _crons },
      isOpenDeleteModal: false,
    });
  };

  handleEditClose = () => {
    this.setState({
      isOpenEditModal: false,
    });
  };

  handleSave = () => {
    var _crons = [...this.state.taskDetail.crons];
    if (this.state.tmpCron.id != null) {
      var index = this.state.taskDetail.crons.findIndex(
        (e) => e.id == this.state.tmpCron.id
      );
      _crons[index] = this.state.tmpCron;
    } else {
      _crons.push(this.state.tmpCron);
    }
    this.setState({
      taskDetail: { ...this.state.taskDetail, cron: _crons },
      isOpenEditModal: false,
    });
  };

  newRecordShow = (val) => {
    this.setState({
      isOpenEditModal: val,
      tmpCron: {id: null, cronValue: null},
    });
  }

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
              <Card.Body>
                <Table responsive borderless>
                  <thead>
                    <tr key={this.state.taskDetail.id}>
                      <th>id</th>
                      <th>Cron Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.taskDetail.crons.map((e) => {
                      return (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.cronValue}</td>
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
