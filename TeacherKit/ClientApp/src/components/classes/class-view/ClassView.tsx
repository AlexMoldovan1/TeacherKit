import * as React from "react";
import { StudentsStore } from "../../../store/students-store";
import "../../../shared/shared-css/list-all.css";
import { inject, observer } from "mobx-react";
import { StudentQueryViewModel } from "../../../view-models/student";
import { ClassesStore } from "src/store/class-store";
import { StudentCatalogItem } from "./item-for-catalog/StudentCatalogItem";
import { ViewStore } from "src/store/view-store";
import { ClassesTabs } from "src/view-models/classes-tabs";

interface Match {
  params: {
    id: number;
  };
}

interface Props {
  classesStore: ClassesStore;
  studentsStore: StudentsStore;
  viewStore: ViewStore;
  match: Match;
}

interface State {
  students: StudentQueryViewModel[];
  redirectTo: string;
  waitingForData: boolean;
}

const initialState: State = {
  students: [],
  redirectTo: "",
  waitingForData: false
};

@inject("viewStore")
@inject("studentsStore")
@inject("classesStore")
@observer
export class ClassView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    this.loadStudentsByClassId();
  }

  componentWillMount() {
    this.props.viewStore.changeActiveClassesTab(ClassesTabs.all);
  }

  loadStudentsByClassId() {
    this.props.studentsStore.loadStudentsByClassId(
      this.props.match.params.id,
      this.loadStudents.bind(this)
    );
  }

  private loadStudents(students: StudentQueryViewModel[]): void {
    this.setState({
      students: students,
      waitingForData: true
    });
  }

  render() {
    return (
      <div className="list-items">
        {this.state.students.map((student, index) => {
          return (
            <div key={index}>
              <StudentCatalogItem
                student={student}
                waitingForData={this.state.waitingForData}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
