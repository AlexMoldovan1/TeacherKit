import * as React from "react";
import { StudentQueryViewModel } from "src/view-models/student";
import { StudentCatalogItem } from "../item-for-catalog/StudentCatalogItem";
import "../class-view.css";

interface Props {
  waitingForDate: boolean;
  students: StudentQueryViewModel[];
}

export class CatalogView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="column catalog-container scrollbarStyle border-section-class ">
        <div className="heading-column">
          <h1 className="heading">{"Students"}</h1>
        </div>

        <div className="list-catalog-items ">
          {this.props.students.map((student, index) => {
            return (
              <div key={index}>
                <StudentCatalogItem student={student} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
