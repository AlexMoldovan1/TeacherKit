import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "./my-icon.css";

interface Props {
  onClick?: Function;
  src?: string;
  className?: string;
}

interface State {}

class MyIcon extends React.Component<Props, State> {
  render() {
    return this.props.src ? (
      <img
        src={this.props.src}
        className={this.props.className}
        onClick={() => this.props.onClick && this.props.onClick()}
        alt="description"
      />
    ) : (
      <Icon
        icon="media"
        className="svg-image-all"
        onClick={() => this.props.onClick && this.props.onClick()}
      />
    );
  }
}

export default MyIcon;
