import * as React from "react";
import { Icon } from "../../../../../node_modules/@blueprintjs/core";
import { NotesViewModel } from "../../../../view-models/notes";
import "../student-view.css";

interface Props {
  notes: NotesViewModel[];
}

export class Notes extends React.Component<Props> {
  render() {
    return (
      <div className="notes">
        <h2 className="section-title">Notes</h2>
        <div className="bookmark-icon-up">
          <Icon color="#f25800" icon="bookmark" iconSize={50} />
        </div>
        <div className="section-content">
          {this.props.notes.map((note, index) => {
            return (
              <div className="note-card" key={index}>
                {note.noteContent}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
