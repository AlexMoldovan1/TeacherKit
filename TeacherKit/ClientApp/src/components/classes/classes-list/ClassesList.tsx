import * as React from "react";
import { inject, observer } from "mobx-react";
import { ClassesStore } from "../../../store/class-store";
import { ViewStore } from "../../../store/view-store";
import {
  ClassCommandViewModel,
  ClassQueryViewModel,
  ClassViewModel
} from "../../../view-models/class";
import "../../../shared/shared-css/list-all.css";
import { Redirect } from "react-router-dom";
import "../../../shared/shared-css/list-all.css";
import { ClassesTabs } from "../../../view-models/classes-tabs";
import { ClassListView } from "../shared-components/class-list-view/ClassListView";
// import { StudentListFilters } from "../shared-components/student-list-filters/StudentListFilters";

interface Props {
  classesStore: ClassesStore;
  viewStore: ViewStore;
  handleStudentDetails: Function;
}

interface State {
  classesToOmit: number[];
  classes: ClassQueryViewModel[];
  redirectTo: string;
  dataWasReceived: boolean;
}

const initialState: State = {
  classesToOmit: [],
  classes: [],
  redirectTo: "",
  dataWasReceived: true
};

@inject("classesStore")
@inject("viewStore")
@observer
export class ClassesList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    this.props.classesStore.loadClasses(() =>
      this.setState({
        classes: this.props.classesStore.classes,
        dataWasReceived: true
      })
    );
  }
  newListOfStudents: ClassViewModel[] = [];

  componentWillMount() {
    this.props.viewStore.changeActiveClassesTab(ClassesTabs.all);
  }

  handleClassesToOmit(classesToOmit: number[]) {
    this.setState({ classesToOmit: classesToOmit });
  }

  handleClick(classModel: ClassViewModel) {
    this.setState({ redirectTo: "/classes/edit/" + classModel.id });
  }

  handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  handleSetStars(classModel: ClassViewModel) {
    this.props.classesStore.AddClass(
      classModel,
      classModel.classesMediaModel,
      classModel.classIconModel
    );
  }

  getClassesItems(): ClassQueryViewModel[] {
    return this.props.classesStore.getClasses;
  }

  render(): React.ReactNode {
    return (
      this.handleRedirect() || (
        <div className="list-all">
          {/* <StudentListFilters
            students={this.props.studentsStore.students}
            handleStudentsToOmit={this.handleStudentsToOmit.bind(this)}
          /> */}
          <ClassListView
            classes={this.getClassesItems.bind(this)()}
            classesToOmit={this.state.classesToOmit}
            waitingForData={!this.state.dataWasReceived}
            handleSetStars={this.handleSetStars.bind(this)}
          />
        </div>
      )
    );
  }
}
