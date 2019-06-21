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
import { ClassQueryViewModel } from "src/view-models/class";
import { ClassesStore } from "src/store/class-store";

interface Props {
  studentsStore: StudentsStore;
  viewStore: ViewStore;
  classesStore: ClassesStore;
}

interface State {
  studentsToOmit: number[];
  students: StudentQueryViewModel[];
  dataWasReceived: boolean;
  filter: { gender: string };
  classId: string;
}

const initialState: State = {
  studentsToOmit: [],
  students: [],
  dataWasReceived: false,
  filter: { gender: "" },
  classId: ""
};

@inject("classesStore")
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
    this.props.studentsStore.AddStudent(student, student.studentsMedia);
  }

  handleAddToClass(student: StudentCommandViewModel) {
    this.props.studentsStore.AddStudent(student, student.studentsMedia);
  }

  private handleChangeClass(classId: string) {
    this.setState({
      classId: classId
    });
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

  getClasses(): ClassQueryViewModel[] {
    let result = this.props.classesStore.getClasses;
    return result;
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
          classes={this.getClasses.bind(this)}
          studentsToOmit={this.state.studentsToOmit}
          handleSetStars={this.handleSetStars.bind(this)}
          handleAddToClass={this.handleAddToClass.bind(this)}
          waitingForData={!this.state.dataWasReceived}
          handleChangeClass={this.handleChangeClass.bind(this)}
        />
      </div>
    );
  }
}
