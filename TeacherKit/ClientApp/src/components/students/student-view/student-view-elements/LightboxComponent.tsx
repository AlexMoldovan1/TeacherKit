import * as React from "react";
import "../student-view.css";
import "./view-elements.css";

interface Props {
  src: string;
}

export class LightboxVideoComponent extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <video controls className="video">
        <source src={"/Images/" + this.props.src} />
      </video>
    );
  }
}
