import * as React from "react";
import "../student-view.css";

interface Props {
  src: string;
  index: number;
  handleOpenImage: Function;
}

export class Media extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  private isVideo(src) {
    return src.endsWith("mp4");
  }

  private handleOpenImage = () => this.props.handleOpenImage(this.props.index);

  render() {
    return this.isVideo(this.props.src) ? (
      <img
        onClick={this.handleOpenImage}
        className="image"
        src={"/UtilsImages/play.png"}
      />
    ) : (
      <img
        onClick={this.handleOpenImage}
        className="image"
        src={"/Images/" + this.props.src}
      />
    );
  }
}
