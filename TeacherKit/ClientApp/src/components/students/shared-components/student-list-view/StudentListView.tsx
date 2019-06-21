import * as React from "react";
import { observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import { StudentQueryViewModel } from "../../../../view-models/student";
import { StudentListItem } from "../student-list-item/StudentListItem";
import Spinner from "../../../../shared/spinner/Spinner";
import { ClassQueryViewModel } from "src/view-models/class";

interface Props {
  students: StudentQueryViewModel[];
  classes: ClassQueryViewModel[];
  waitingForData: boolean;
  studentsToOmit: number[];
  handleSetStars: Function;
  handleAddToClass: Function;
  handleChangeClass: Function;
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
                    classes={this.props.classes}
                    handleSetStars={this.props.handleSetStars}
                    handleAddToClass={this.props.handleAddToClass}
                    handleChangeClass={this.props.handleChangeClass}
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
