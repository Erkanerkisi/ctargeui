import React, { Component } from "react";
import { Card, Button, Accordion, Table} from "react-bootstrap";

export default class ScheduledRequestBodyInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail : this.props.taskDetail,
      tmpRequestBody : { id: null, body: null},
      isOpenDeleteModal: false,
      isOpenEditModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskDetail.id !== this.props.taskDetail.id) {
      this.setState({
        taskDetail : this.props.taskDetail,
      })
    }
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
                  </tr>
                </thead>
                <tbody>
                  {this.state.taskDetail.requestBody != null && (
                    <tr key={this.state.taskDetail.requestBody.id}>
                      <td>{this.state.taskDetail.requestBody.id}</td>
                      <td>{this.state.taskDetail.requestBody.body}</td>
                    </tr>
                  )}
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
