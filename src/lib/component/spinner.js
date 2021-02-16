import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

export default class SchSpinner extends Component {
  render() {
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh' }}>
        <Spinner
          animation="border"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
