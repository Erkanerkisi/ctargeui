import { Card, Button, Accordion, Table, Modal } from "react-bootstrap";
import React, { Component } from "react";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import TaskInfoTab from "./tabs/task_info_tab";

export default class TaskDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TaskInfoTab taskDetail = {this.props.taskDetail}/>
        <br />
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
                  <tr key={this.props.taskDetail.id}>
                    <th>id</th>
                    <th>Header Name</th>
                    <th>Header Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.taskDetail.headers.map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.key}</td>
                        <td>{e.value}</td>
                        <td>
                          <Button variant="info">
                            <PencilFill />
                          </Button>{" "}
                          <Button variant="danger">
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
        <br />
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
                          <Button variant="info">
                            <PencilFill />
                          </Button>{" "}
                          <Button variant="danger">
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
        <br />
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Request Body Information
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Table responsive>
                <thead>
                  <tr key={this.props.taskDetail.id}>
                    <th>id</th>
                    <th>body</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.taskDetail.body != null && (
                    <tr key={this.props.taskDetail.body.id}>
                      <td>{this.props.taskDetail.body.id}</td>
                      <td>{this.props.taskDetail.body.body}</td>
                      <td>
                        <Button variant="info">
                          <PencilFill />
                        </Button>{" "}
                        <Button variant="danger">
                          <TrashFill />
                        </Button>{" "}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <br />
        <Button size="lg" variant="primary">
          Save Task
        </Button>{" "}
        <Button size="lg" variant="danger">
          Delete Task
        </Button>{" "}
      </div>
    );
  }
}
