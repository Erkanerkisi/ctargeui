import React, { Component } from "react";
import { getScheduledTasks, getTasks } from "../../network/network";
import { Card, Row, Col, Container, Alert } from "react-bootstrap";


// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);



// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
  
  type: "pie2d", // The chart type
  width: "100%", // Width of the chart
  height: "70%", // Height of the chart
  dataFormat: "json", // Data type
  containerBackgroundOpacity: "0",
  dataSource: {
    chart: {
      bgColor : "#131924",
      borderColor: "#131924",
      showBorder: false, 
      defaultCenterLabel: "selam",
      paletteColors: "#EDF8B1, #FFFFFF",
      nullEntityColor : "#2891AB"
    },
    data: [
      {
        label: "active",
        value: "1"
      },
      {
        label: "inactive",
        alpha: 5,
        value: "5"
      }
    ]
  }
};

const errorMessage = "Could not load data from service";

var darkMode = {
  backgroundColor: "#17202E",
  color: "white",
  height: "100vh",
};

var cardBackground = {
  backgroundColor: "#131924",
  width: "18rem",
};

var cardPie2dBackground = {
  backgroundColor: "#131924",
  width: "42rem",
  height: "25rem"
};

var cardHeaderText = {
  color: "#8091AB",
};

export default class SchedulerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      scheduledTasks: [],
      showAlert: false,
      error: false,
    };
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert = (val) => {
    this.setState({ showAlert: val });
  };

  componentDidMount() {
    getTasks().then((res) => {
      if (res.httpStatusCode == 200) {
        this.setState({ tasks: res.body });
      } else {
        this.setState(() => ({ showAlert: true }));
      }
    });

    getScheduledTasks().then((res) => {
      if (res.httpStatusCode == 200) {
        this.setState({ scheduledTasks: res.body });
      } else {
        this.setState(() => ({ showAlert: true }));
      }
    });
  }

  render() {
    return (
      <div style={darkMode}>
        <Container>
          <br />
          {this.state.showAlert && (
            <Alert
              key={1}
              variant="danger"
              dismissible
              onClose={() => this.showAlert(false)}
            >
              {errorMessage}
            </Alert>
          )}
          <Row className="justify-content-md-center">
            <Col xs lg="4">
              <Card
                key={1}
                text="white"
                style={cardBackground}
                className="mb-2"
              >
                <Card.Body>
                  <Card.Title style={cardHeaderText}>
                    Scheduled Tasks
                  </Card.Title>
                  <Card.Text>
                    <br />
                    <h1>{this.state.scheduledTasks.length}</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs lg="4">
              <Card
                key={2}
                text="white"
                style={cardBackground}
                className="mb-2"
              >
                <Card.Body>
                  <Card.Title style={cardHeaderText}>Total Tasks</Card.Title>
                  <Card.Text>
                    <br />
                    <h1>{this.state.tasks.length}</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs lg="4">
              <Card
                key={3}
                text="white"
                style={cardBackground}
                className="mb-2"
              >
                <Card.Body>
                  <Card.Title style={cardHeaderText}>Active Tasks</Card.Title>
                  <Card.Text>
                    <br />
                    <h1>
                      {
                        this.state.tasks.filter((fil) => fil.status == "Active")
                          .length
                      }
                    </h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col xs lg="4">
              <Card
                key={4}
                text="white"
                style={cardBackground}
                className="mb-2"
              >
                <Card.Body>
                  <Card.Title style={cardHeaderText}>Passive Tasks</Card.Title>
                  <Card.Text>
                    <br />
                    <h1>
                      {
                        this.state.tasks.filter((fil) => fil.status != "Active")
                          .length
                      }
                    </h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs lg="8">
              <Card
                key={5}
                style={cardPie2dBackground}
              >
                <Card.Body>
                  <Card.Title style={cardHeaderText}>Pie Chart</Card.Title>
                  <Card.Text >
                  <ReactFC {...chartConfigs} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
