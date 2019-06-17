import * as React from "react";
import { inject, observer } from "mobx-react";
import {
  StudentQueryViewModel,
  StudentCommandViewModel
} from "../../../view-models/student";
import { StudentsStore } from "../../../store/students-store";
import { ViewStore } from "../../../store/view-store";
import { StudentsTabs } from "../../../view-models/students-tabs";
import { StudentListView } from "../../students/shared-components/student-list-view/StudentListView";
import { StudentListFilters } from "../shared-components/student-list-filters/StudentListFilters";
import "../../../shared/shared-css/list-all.css";

interface Props {
  studentsStore: StudentsStore;
  viewStore: ViewStore;
}

interface State {
  studentsToOmit: number[];
  students: StudentQueryViewModel[];
  dataWasReceived: boolean;
  filter: { gender: string };
}

const initialState: State = {
  studentsToOmit: [],
  students: [],
  dataWasReceived: false,
  filter: { gender: "" }
};

@inject("studentsStore")
@inject("viewStore")
@observer
export class StudentsStars extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    this.props.studentsStore.loadStudents(() =>
      this.setState({
        dataWasReceived: true
      })
    );
  }

  componentWillMount() {
    this.props.viewStore.changeActiveStudentsTab(StudentsTabs.stars);
  }

  handleSetStars(student: StudentCommandViewModel) {
    this.props.studentsStore.AddOrUpdateStudent(student, student.studentsMedia);
  }

  handleFilterByGender(gender: string) {
    this.setState({ filter: { gender: gender } });
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
    let result = this.props.studentsStore.getStars;
    result = this.filterByGender(result);
    return result;
  }

  handleStudentsToOmit(studentsToOmit: number[]) {
    this.setState({ studentsToOmit: studentsToOmit });
  }

  render(): React.ReactNode {
    return (
      <div className="list-all">
        <StudentListFilters
          students={this.props.studentsStore.students}
          handleFilterByGender={this.handleFilterByGender.bind(this)}
          handleStudentsToOmit={this.handleStudentsToOmit.bind(this)}
        />
        <StudentListView
          students={this.getStudentsItems.bind(this)()}
          studentsToOmit={this.state.studentsToOmit}
          handleSetStars={this.handleSetStars.bind(this)}
          waitingForData={!this.state.dataWasReceived}
        />
      </div>
    );
  }
}
