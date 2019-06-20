import * as React from "react";
import { inject, observer } from "mobx-react";
import { StudentsStore } from "../../../store/students-store";
import { ViewStore } from "../../../store/view-store";
import {
  StudentQueryViewModel,
  StudentViewModel,
  StudentCommandViewModel
} from "../../../view-models/student";
import { Redirect } from "react-router-dom";
import "../../../shared/shared-css/list-all.css";
import { StudentsTabs } from "../../../view-models/students-tabs";
import { StudentListView } from "../shared-components/student-list-view/StudentListView";
import { StudentListFilters } from "../shared-components/student-list-filters/StudentListFilters";

interface Props {
  studentsStore: StudentsStore;
  viewStore: ViewStore;
  handleStudentDetails: Function;
}

interface State {
  studentToOmit: number[];
  students: StudentQueryViewModel[];
  redirectTo: string;
  dataWasReceived: boolean;
  filter: {
    gender: string;
  };
}

const initialState: State = {
  studentToOmit: [],
  students: [],
  redirectTo: "",
  dataWasReceived: true,
  filter: { gender: "" }
};

@inject("studentsStore")
@inject("viewStore")
@observer
export class StudentsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    this.props.studentsStore.loadStudents(() =>
      this.setState({
        students: this.props.studentsStore.students,
        dataWasReceived: true
      })
    );
  }
  newListOfStudents: StudentViewModel[] = [];

  componentWillMount() {
    this.props.viewStore.changeActiveStudentsTab(StudentsTabs.all);
  }

  handleStudentsToOmit(studentToOmit: number[]) {
    this.setState({ studentToOmit: studentToOmit });
  }

  handleClick(student: StudentViewModel) {
    this.setState({ redirectTo: "/students/edit/" + student.id });
  }

  handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  handleSetStars(student: StudentCommandViewModel) {
    this.props.studentsStore.AddStudent(student, student.studentsMedia);
  }

  private handleFilterByGender(gender: string) {
    this.setState({
      filter: { gender: gender }
    });
  }

  private filterByGender(
    students: StudentQueryViewModel[]
  ): StudentQueryViewModel[] {
    if (this.state.filter.gender) {
      return students.filter(
        student => student.gender == this.state.filter.gender
      );
    }
    return students;
  }

  getStudentsItems(): StudentQueryViewModel[] {
    let result = this.props.studentsStore.getStudents;
    result = this.filterByGender(result);
    return result;
  }

  render(): React.ReactNode {
    return (
      this.handleRedirect() || (
        <div className="list-all">
          <StudentListFilters
            students={this.props.studentsStore.students}
            handleFilterByGender={this.handleFilterByGender.bind(this)}
            handleStudentsToOmit={this.handleStudentsToOmit.bind(this)}
          />
          <StudentListView
            students={this.getStudentsItems.bind(this)()}
            studentsToOmit={this.state.studentToOmit}
            waitingForData={!this.state.dataWasReceived}
            handleSetStars={this.handleSetStars.bind(this)}
          />
        </div>
      )
    );
  }
}
