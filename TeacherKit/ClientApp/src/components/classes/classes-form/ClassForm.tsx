import "./class-form.css";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { Tab, Tabs, Button, Icon, Tag } from "@blueprintjs/core";
import { ViewStore } from "../../../store/view-store";
import { ClassesStore } from "../../../store/class-store";
import { ClassesTabs } from "../../../view-models/classes-tabs";
import {
  ClassViewModel,
  ClassQueryViewModel,
  ClassCommandViewModel
} from "../../../view-models/class";
import { StudentsStore } from "src/store/students-store";
import { NotesViewModel } from "src/view-models/notes";
import { GroupsViewModel } from "src/view-models/groups";
import { ClassMediaViewModel } from "src/view-models/media";
import {
  StudentQueryViewModel,
  StudentViewModel
} from "src/view-models/student";
import ClassSaveModal from "./ClassSaveModal";
import { ClassDetails } from "./details/ClassDetails";
import { ClassesNotes } from "./notes/ClassesNotes";
import { ClassMedia } from "./media/ClassMedia";
import { CourseDates } from "./date-picker/CourseDates";
import { UserStore } from "src/store/user-store";

interface Match {
  params: {
    id: number;
  };
}

interface Props {
  classesStore: ClassesStore;
  viewStore: ViewStore;
  studentsStore: StudentsStore;
  userStore: UserStore;
  match: Match;
  location: Location;
}

interface State {
  activeClass: {
    id: number;
    title: string;
    code: number;
    notes: NotesViewModel[];
    courseStartDate: Date;
    courseEndDate: Date;
    groups: GroupsViewModel[];
    classIconModel: ClassMediaViewModel;
    stars: boolean;
    students: StudentViewModel[];
    classesMediaModel: ClassMediaViewModel[];
    userId: number;
  };
  saveModalIsOpen: boolean;
  classMediaImages: ClassMediaViewModel[];
  classMediaFiles: File[];
  classMediaFile: File;
}

const activeClass: ClassViewModel = {
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
  userId: 0
};

const initialState: State = {
  activeClass: activeClass,
  saveModalIsOpen: false,
  classMediaImages: [],
  classMediaFiles: [],
  classMediaFile: new File([], "")
};

@inject("classesStore")
@inject("viewStore")
@inject("studentsStore")
@inject("userStore")
@observer
export class ClassForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...initialState };

    let classesId = props.match.params.id;
    if (classesId) {
      this.props.classesStore.loadActiveClass(
        classesId,
        this.loadClass.bind(this)
      );
    }
  }

  private loadClass(classModel: ClassQueryViewModel): void {
    this.setState({
      activeClass: classModel,
      classMediaImages: classModel.classMediaQueryModel
    });
  }

  componentWillMount() {
    this.props.viewStore.changeActiveClassesTab(ClassesTabs.add);
  }

  componentDidMount() {
    this.resetClass();
  }

  private resetModal() {
    this.setState({ saveModalIsOpen: true });
  }

  private resetClass() {
    this.setState(initialState);
    this.setState({
      activeClass: {
        ...this.state.activeClass,
        notes: []
      }
    });
  }

  private handleModalSave(): void {
    this.setState({ saveModalIsOpen: false });
  }

  private handleTitleChange(title: string) {
    this.setState({
      activeClass: { ...this.state.activeClass, title: title }
    });
  }

  private handleCodeChange(code: number) {
    this.setState({
      activeClass: { ...this.state.activeClass, code: code }
    });
  }

  private handleCourseStartChange(courseStartDate: Date) {
    this.setState({
      activeClass: {
        ...this.state.activeClass,
        courseStartDate: courseStartDate
      }
    });
  }

  private handleCourseEndChange(courseEndDate: Date) {
    this.setState({
      activeClass: { ...this.state.activeClass, courseEndDate: courseEndDate }
    });
  }

  private handleGroups(groups: string[]) {
    let arrayGroups: GroupsViewModel[] = [];
    groups.forEach(element => {
      arrayGroups.push(new GroupsViewModel(element));
    });
    this.setState({
      activeClass: { ...this.state.activeClass, groups: arrayGroups }
    });
  }

  private handleNotesChange(notes: string[]) {
    let arrayNotes: NotesViewModel[] = [];

    notes.forEach((element, key) => {
      arrayNotes.push(new NotesViewModel(element));
    });

    this.setState({
      activeClass: {
        ...this.state.activeClass,
        notes: arrayNotes
      }
    });
  }

  private handleUploadIcon(media: File) {
    this.setState({
      classMediaFile: media
    });
  }

  private handleUploadPhoto(media: File) {
    let files = this.state.classMediaFiles;
    files.push(media);
    this.setState({
      classMediaFiles: files
    });
  }

  private handleDeletePhoto(index: any) {
    let classMediaFiles = this.state.classMediaFiles;
    classMediaFiles.splice(index, 1);
    this.setState({ classMediaFiles: classMediaFiles });
  }

  private handleDeletePhotoForEditedClass(index: any, image: string[]) {
    let classMedias = this.state.classMediaImages;
    classMedias.splice(index, 1);

    this.setState({
      activeClass: {
        ...this.state.activeClass,
        classesMediaModel: classMedias
      }
    });
  }

  private handleCancel() {
    window.location.href = "/shoppingList/favorites";
  }

  private handleSavedBtnPressed(): void {
    let detailsError = false;
    let courseDetailsError = false;
    const userId = localStorage.getItem("userId");
    if (userId != null) {
      this.state.activeClass.userId = parseInt(userId);
    }

    if (
      this.state.activeClass.title === "" ||
      this.state.activeClass.code === 0
    ) {
      this.handleDetailsError(true);
      detailsError = true;
    } else {
      this.handleDetailsError(false);
    }

    if (
      this.state.activeClass.courseStartDate === undefined ||
      this.state.activeClass.courseEndDate === undefined
    ) {
      this.handleCourseDateError(true);
      courseDetailsError = true;
    } else {
      this.handleCourseDateError(false);
    }

    if (detailsError || courseDetailsError) {
      return;
    }

    if (this.state.saveModalIsOpen) {
    } else {
      this.setState({ saveModalIsOpen: true });
    }
  }

  private handleDetailsError(isError: boolean) {
    let detailsTab = document.getElementById(
      "bp3-tab-title_ClassFormTabs_DetailsTab"
    );

    if (detailsTab) {
      if (isError) {
        detailsTab.classList.replace("class-tab", "class-tab-error");
      } else {
        detailsTab.classList.replace("class-tab-error", "class-tab");
      }
    }
  }

  private handleCourseDateError(isError: boolean) {
    let courseDateTabs = document.getElementById(
      "bp3-tab-title_ClassFormTabs_CourseDateTab"
    );
    if (courseDateTabs) {
      if (isError) {
        courseDateTabs.classList.replace("class-tab", "class-tab-error");
      } else {
        courseDateTabs.classList.replace("class-tab-error", "class-tab");
      }
    }
  }

  private handleSubmit(callback?: Function) {
    this.props.classesStore.AddClass(
      this.state.activeClass,
      this.state.classMediaFiles,
      this.state.classMediaFile,
      callback
    );
    this.resetClass();
    this.resetModal();
  }

  render() {
    return (
      <div className="scrollbarStyle add-edit-class">
        <form className="class-form">
          <Tabs id="ClassFormTabs">
            <Tab
              id="DetailsTab"
              title={
                <div>
                  Details
                  <Icon icon="error" />
                </div>
              }
              className="class-tab"
              panel={
                <ClassDetails
                  classModel={this.state.activeClass}
                  handleTitleChange={this.handleTitleChange.bind(this)}
                  handleCodeChange={this.handleCodeChange.bind(this)}
                  handleGroups={this.handleGroups.bind(this)}
                  handleUploadIcon={this.handleUploadIcon.bind(this)}
                />
              }
            />
            <Tab
              id="CourseDateTab"
              title="Course dates"
              className="class-tab"
              panel={
                <CourseDates
                  classModel={this.state.activeClass}
                  handleCourseStartChange={this.handleCourseStartChange.bind(
                    this
                  )}
                  handleCourseEndChange={this.handleCourseEndChange.bind(this)}
                />
              }
            />
            <Tab
              id="MediaTab"
              title="Media"
              className="class-tab"
              panel={
                <ClassMedia
                  handleUploadPhoto={this.handleUploadPhoto.bind(this)}
                  handleDeletePhoto={this.handleDeletePhoto.bind(this)}
                  media={this.state.classMediaImages}
                  handleDeletePhotoForEditedClass={this.handleDeletePhotoForEditedClass.bind(
                    this
                  )}
                />
              }
            />
            <Tab
              id="NotesTab"
              title={
                <div>
                  Note
                  <Icon icon="error" />
                </div>
              }
              className="class-tab"
              panel={
                <ClassesNotes
                  classModel={this.state.activeClass}
                  handleNotesChange={this.handleNotesChange.bind(this)}
                />
              }
            />
          </Tabs>
          <div className="submit-button">
            <Button
              className="bp3-button bp3-active cancel-class"
              onClick={this.handleCancel.bind(this)}
            >
              Cancel
            </Button>
            <React.Fragment>
              <button
                type="button"
                className="bp3-button bp3-intent-primary save-class"
                onClick={this.handleSavedBtnPressed.bind(this)}
              >
                Save
              </button>
              <ClassSaveModal
                open={this.state.saveModalIsOpen}
                handleSubmit={this.handleSubmit.bind(this)}
                onModalClose={this.handleModalSave.bind(this)}
                classesStore={this.props.classesStore}
              />
            </React.Fragment>
          </div>
        </form>
      </div>
    );
  }
}
