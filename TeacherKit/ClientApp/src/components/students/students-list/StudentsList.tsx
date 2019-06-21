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
import { ClassQueryViewModel, ClassViewModel } from "src/view-models/class";
import { ClassesStore } from "src/store/class-store";
import { number } from "prop-types";

interface Props {
  studentsStore: StudentsStore;
  classesStore: ClassesStore;
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
  classId: number;
  activeClass: ClassViewModel;
}

const initialState: State = {
  studentToOmit: [],
  students: [],
  redirectTo: "",
  dataWasReceived: true,
  filter: { gender: "" },
  classId: 0,
  activeClass: {
    id: 0,
    title: "",
    code: 0,
    courseStartDate: new Date(),
    courseEndDate: new Date(),
    groups: [],
    stars: false,
    notes: [],
    classesMediaModel: [],
    classIconModel: { imageName: "" },
    students: []
  }
};

@inject("studentsStore")
@inject("classesStore")
@inject("viewStore")
@observer
export class StudentsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    this.props.studentsStore.loadStudents(
      () =>
        this.setState({
          students: this.props.studentsStore.students,
          dataWasReceived: true
        }),
      () => this.props.classesStore.loadClasses()
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

  handleAddToClass(student: StudentCommandViewModel) {
    student.classModelId = this.state.classId;
    this.props.studentsStore.AddStudent(student, []);
  }

  private handleFilterByGender(gender: string) {
    this.setState({
      filter: { gender: gender }
    });
  }

  private handleChangeClass(classId: number) {
    this.setState({
      classId: classId
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

  getClasses(): ClassQueryViewModel[] {
    let result = this.props.classesStore.getClasses;
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
            classes={this.getClasses.bind(this)()}
            studentsToOmit={this.state.studentToOmit}
            waitingForData={!this.state.dataWasReceived}
            handleSetStars={this.handleSetStars.bind(this)}
            handleAddToClass={this.handleAddToClass.bind(this)}
            handleChangeClass={this.handleChangeClass.bind(this)}
          />
        </div>
      )
    );
  }
}
