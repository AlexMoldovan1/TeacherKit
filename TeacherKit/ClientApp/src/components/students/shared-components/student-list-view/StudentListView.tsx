import * as React from "react";
import { observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import { StudentQueryViewModel } from "../../../../view-models/student";
import { StudentListItem } from "../student-list-item/StudentListItem";
import Spinner from "../../../../shared/spinner/Spinner";

interface Props {
  students: StudentQueryViewModel[];
  waitingForData: boolean;
  studentsToOmit: number[];
  handleSetStars: Function;
}

@observer
export class StudentListView extends React.Component<Props> {
  private studentShouldBeOmittedAtRender(student) {
    return this.props.studentsToOmit.find(id => student.id === id);
  }

  render() {
    return (
      <React.Fragment>
        <div className="list-items">
          <Spinner waitingForData={this.props.waitingForData} />
          {this.props.students
            .filter(student => !this.studentShouldBeOmittedAtRender(student))
            .map((student, index) => {
              return (
                <div key={index}>
                  <StudentListItem
                    student={student}
                    handleSetStars={this.props.handleSetStars}
                    waitingForData={this.props.waitingForData}
                  />
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
