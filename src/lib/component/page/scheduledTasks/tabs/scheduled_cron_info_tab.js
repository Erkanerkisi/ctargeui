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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskDetail.id !== this.props.taskDetail.id) {
      this.setState({
        taskDetail: this.props.taskDetail,
      });
    }
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
