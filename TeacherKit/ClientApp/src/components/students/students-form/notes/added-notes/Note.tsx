import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "../student-notes.css";

interface State {
  content: string;
}

interface Props {
  content: string;
  id: number;
  handleRemove: Function;
  handleNoteValueUpdate: Function;
}

export default class Note extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setState({ content: this.props.content });
  }

  handleDelete() {
    this.props.handleRemove(this.props.id);
  }

  handleChange(e: any) {
    this.setState({ content: e.target.value });
    this.props.handleNoteValueUpdate(this.props.id, e.target.value);
  }

  render() {
    return (
      <div className="bp3-form-group bp3-inline student-notes ">
        <textarea
          value={this.props.content}
          className="student-note added-note"
          onChange={this.handleChange.bind(this)}
        />

        <Icon
          className="note-button"
          icon="minus"
          onClick={this.handleDelete.bind(this)}
        />
      </div>
    );
  }
}
