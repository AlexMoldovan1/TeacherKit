import * as React from "react";
import "./spinner.css";

interface Props {
  waitingForData: boolean;
}

class Spinner extends React.Component<Props> {
  render() {
    return (
      <div
        className="lds-spinner"
        style={this.props.waitingForData ? {} : { display: "none" }}
      >
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}

export default Spinner;
