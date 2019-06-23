import * as React from "react";
import { Icon } from "@blueprintjs/core";

interface Props {
  onClick?: Function;
  src: string;
  className: string;
}

class IconClassesElements extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.props.src != "" ? (
      <img
        src={this.props.src}
        className={this.props.className}
        onClick={() => this.props.onClick && this.props.onClick()}
        alt="description"
      />
    ) : (
      <Icon
        icon="media"
        className="svg-image"
        onClick={() => this.props.onClick && this.props.onClick()}
      />
    );
  }
}

export default IconClassesElements;
