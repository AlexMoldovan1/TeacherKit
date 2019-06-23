import * as React from "react";
import { StudentsStore } from "../../../store/students-store";
import "../../../shared/shared-css/list-all.css";
import "./class-view.css";
import { inject, observer } from "mobx-react";
import { StudentQueryViewModel } from "../../../view-models/student";
import { ClassesStore } from "src/store/class-store";
import { ViewStore } from "src/store/view-store";
import { ClassesTabs } from "src/view-models/classes-tabs";
import { ClassMediaViewModel } from "src/view-models/media";
import Lightbox from "lightbox-react";
import { ClassQueryViewModel } from "src/view-models/class";
import { Tooltip, Icon } from "@blueprintjs/core";
import { Media } from "src/components/students/student-view/student-view-elements/Media";
import { CatalogView } from "./class-view-elements/CatalogView";
import { Redirect } from "react-router";

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
  isOpenImage: boolean;
  activeClass: ClassQueryViewModel;
}

const initialState: State = {
  students: [],
  redirectTo: "",
  waitingForData: false,
  isOpenImage: false,
  activeClass: {
    id: 0,
    title: "",
    notes: [],
    code: 0,
    courseStartDate: new Date(),
    courseEndDate: new Date(),
    groups: [],
    classIconModel: { imageName: "" },
    stars: false,
    classesMediaModel: [],
    students: [],
    classIconQueryModel: new ClassMediaViewModel(""),
    classMediaQueryModel: [],
    iconName: ""
  }
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
    this.loadActiveClass();
    this.props.viewStore.changeActiveClassesTab(ClassesTabs.all);
  }

  componentWillMount() {
    this.props.viewStore.changeActiveClassesTab(ClassesTabs.all);
  }

  loadActiveClass() {
    this.props.classesStore.loadActiveClass(
      this.props.match.params.id,
      this.loadClass.bind(this)
    );
  }

  loadStudentsByClassId() {
    this.props.studentsStore.loadStudentsByClassId(
      this.props.match.params.id,
      this.loadStudents.bind(this)
    );
  }

  private loadClass(classModel: ClassQueryViewModel): void {
    this.setState({
      activeClass: classModel,
      waitingForData: true
    });
  }

  private loadStudents(students: StudentQueryViewModel[]): void {
    this.setState({
      students: students,
      waitingForData: true
    });
  }

  private handleOpenImage = index => {
    this.setState({ isOpenImage: true });
  };

  private showLightbox() {
    return (
      <Lightbox
        mainSrc={
          "/Images/" + this.state.activeClass.classIconQueryModel.imageName
        }
        onCloseRequest={this.handleCloseLightbox}
        enableZoom={false}
      />
    );
  }

  private handleCloseLightbox = () => this.setState({ isOpenImage: false });

  private hasImages() {
    return (
      this.state.isOpenImage &&
      this.state.activeClass.classIconQueryModel.imageName != ""
    );
  }

  private handleEditClick = () => {
    this.setState({
      redirectTo: "/classes/edit/" + this.state.activeClass.id
    });
  };

  private handleDeleteStars = () => {
    this.setState({
      activeClass: { ...this.state.activeClass, stars: false, iconName: "" }
    });
    let updatedClass = this.state.activeClass;
    updatedClass.stars = false;

    this.props.classesStore.AddClass(this.state.activeClass, [], "");
  };

  private handleSetStars = () => {
    this.setState({
      activeClass: { ...this.state.activeClass, stars: false, iconName: "" }
    });
    let updatedClass = this.state.activeClass;
    updatedClass.stars = false;
    this.props.classesStore.AddClass(updatedClass, [], "");
  };

  private displayMedia() {
    return (
      <Media
        src={this.state.activeClass.classIconQueryModel.imageName}
        index={0}
        handleOpenImage={this.handleOpenImage}
      />
    );
  }

  private handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return null;
  }

  private showIcon() {
    return (
      this.handleRedirect() || (
        <div className="icon-container border-section-class">
          <div className="column">
            <div className="heading-column">
              <h1 className="heading-class-title">
                <label className="label-title">
                  {this.state.activeClass.title}
                </label>
                <div className="icon" onClick={this.handleEditClick}>
                  <Tooltip content="Edit class" position="top">
                    <Icon icon="edit" iconSize={30} />
                  </Tooltip>
                </div>
                {this.state.activeClass.stars ? (
                  <div className="icon">
                    <Tooltip content="Remove from stars classes" position="top">
                      <Icon
                        icon="star"
                        onClick={this.handleDeleteStars}
                        iconSize={30}
                        className="active"
                      />
                    </Tooltip>
                  </div>
                ) : (
                  <div className="icon">
                    <Tooltip content="Add to stars classes" position="top">
                      <Icon
                        icon="star"
                        onClick={this.handleSetStars}
                        iconSize={30}
                        className="normal"
                      />
                    </Tooltip>
                  </div>
                )}
              </h1>
            </div>
            <div className="rowIcon">
              <div className="column icon-image">
                <div className="divForMediaIcon">
                  {this.state.activeClass.classIconQueryModel.imageName != "" &&
                    this.displayMedia()}
                </div>
              </div>
            </div>
            <div className="rowIcon">
              <label className="label-sections">Groups: </label>
              {this.state.activeClass.groups.map(group => {
                return <label className="label-groups">{group.content}</label>;
              })}
            </div>
            <div className="rowIcon">
              <label className="label-sections">Course start date: </label>
              <label style={{ display: "grid" }}>
                {this.state.activeClass.courseStartDate.toString().slice(0, 10)}
              </label>
              <label style={{ display: "grid" }}>Course end date: </label>
              <label>
                {this.state.activeClass.courseEndDate.toString().slice(0, 10)}
              </label>
            </div>
          </div>
        </div>
      )
    );
  }

  render() {
    return (
      <div className="view-container">
        {this.hasImages() && this.showLightbox()}
        <div className="row">
          {this.showIcon()}
          <CatalogView
            students={this.state.students}
            waitingForDate={this.state.waitingForData}
          />
        </div>
      </div>
    );
  }
}
