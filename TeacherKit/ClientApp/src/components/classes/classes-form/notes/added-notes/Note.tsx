import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "../class-notes.css";
import { NotesViewModel } from "src/view-models/notes";

interface State {
  content: string;
}

interface Props {
  note: NotesViewModel;
  id: number;
  handleRemove: Function;
  handleNoteValueUpdate: Function;
}

export default class Note extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setState({ content: this.props.note.noteContent });
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
      <div className="bp3-form-group bp3-inline class-notes ">
        <textarea
          value={this.props.note.noteContent}
          className="class-note added-note"
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
