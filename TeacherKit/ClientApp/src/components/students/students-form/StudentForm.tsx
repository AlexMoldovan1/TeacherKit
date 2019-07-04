import "./student-form.css";
import "../../../shared/shared-css/list-all.css";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { Tab, Tabs } from "@blueprintjs/core";
import {
  StudentQueryViewModel,
  StudentViewModel
} from "../../../view-models/student";
import { Icon } from "@blueprintjs/core";
import { StudentsStore } from "../../../store/students-store";
import { ViewStore } from "../../../store/view-store";
import { NotesViewModel } from "../../../view-models/notes";
import { StudentsMediaViewModel } from "../../../view-models/media";
import { StudentsTabs } from "../../../view-models/students-tabs";
import { StudentMedia } from "./media/StudentMedia";
import { StudentNotes } from "./notes/StudentNotes";
import { StudentDeleteModal } from "./StudentDeleteModal";
import StudentSaveModel from "./StudentSaveModal";
import { StudentDetails } from "./personal-info/StudentDetails";
import { ParentDetails } from "./parent-info/ParentDetails";
import { UserStore } from "src/store/user-store";

interface Match {
  params: {
    id: number;
  };
}

interface Props {
  studentsStore: StudentsStore;
  viewStore: ViewStore;
  userStore: UserStore;
  match: Match;
}

interface State {
  activeStudent: {
    id: number;
    firstName: string;
    lastName: string;
    code: number;
    age: number;
    phone: string;
    email: string;
    studentsMediaFiles: StudentsMediaViewModel[];
    notes: NotesViewModel[];
    adress: string;
    gender: string;
    star: boolean;
    classModelId: number;
    userId: number;
    parentInfo: {
      id: number;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      adress: string;
    };
  };
  studentsMediaName: StudentsMediaViewModel[];
  studentsMediaDeletedData: any[];
  studentsMediaFile: File[];
  deleteModalIsOpen: boolean;
  saveModalIsOpen: boolean;
}

const activeStudent: StudentViewModel = {
  id: 0,
  firstName: "",
  lastName: "",
  code: 0,
  age: 0,
  phone: "",
  email: "",
  classModelId: 0,
  studentsMediaFiles: [],
  notes: [],
  adress: "",
  gender: "male",
  star: false,
  userId: 0,
  parentInfo: {
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    adress: ""
  }
};

const initialState: State = {
  activeStudent: activeStudent,
  studentsMediaName: [],

  deleteModalIsOpen: false,
  studentsMediaFile: [],
  studentsMediaDeletedData: [],
  saveModalIsOpen: false
};

@inject("studentsStore")
@inject("viewStore")
@inject("userStore")
@observer
export class StudentForm extends React.Component<Props, State> {
  private saveInput: any;
  private savePressed = false;
  constructor(props: Props) {
    super(props);
    let studentId = props.match.params.id;
    this.state = initialState;
    if (studentId) {
      this.props.studentsStore.loadActiveStudent(
        studentId,
        this.loadStudent.bind(this)
      );
    }
  }

  private loadStudent(student: StudentQueryViewModel): void {
    this.resetMediaDeletedData();
    this.setState({
      activeStudent: student,
      studentsMediaName: student.studentsMedia
    });
    this.resetMediaFiles();
  }

  componentWillMount() {
    this.props.viewStore.changeActiveStudentsTab(StudentsTabs.add);
  }

  componentDidMount() {
    this.resetStudent();
  }

  private resetMediaFiles() {
    this.setState({
      studentsMediaFile: []
    });
  }

  private resetActiveStudentMediaFile() {
    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        studentsMediaFiles: []
      },
      studentsMediaFile: []
    });
  }
  private resetMediaDeletedData() {
    this.setState({
      studentsMediaDeletedData: []
    });
  }

  private resetModal() {
    this.setState({ saveModalIsOpen: true });
  }
  private resetStudent() {
    this.setState({ ...initialState });
  }

  private handleStudentDetailsFirstNameChange(firstName: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: { ...this.state.activeStudent, firstName: firstName }
    });
  }

  private handleStudentDetailsLastNameChange(lastName: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: { ...this.state.activeStudent, lastName: lastName }
    });
  }

  private handleStudentDetailsCodeChange(code: number) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: { ...this.state.activeStudent, code: code }
    });
  }

  private handleStudentDetailsAgeChange(age: number) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: { ...this.state.activeStudent, age: age }
    });
  }

  private handleStudentDetailsPhoneChange(phoneNumber: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: { ...this.state.activeStudent, phone: phoneNumber }
    });
  }

  private handleStudentDetailsEmailChange(email: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: { ...this.state.activeStudent, email: email }
    });
  }

  private handleStudentDetailsGenderChange(gender: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        gender: gender
      }
    });
  }

  private handleStudentDetailsAdressChange(adress: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: { ...this.state.activeStudent, adress: adress }
    });
  }

  private handleParentDetailsFirstNameChange(firstName: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        parentInfo: {
          ...this.state.activeStudent.parentInfo,
          firstName: firstName
        }
      }
    });
  }

  private handleParentDetailsLastNameChange(lastName: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        parentInfo: {
          ...this.state.activeStudent.parentInfo,
          lastName: lastName
        }
      }
    });
  }

  private handleParentDetailsPhoneChange(phoneNumber: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        parentInfo: {
          ...this.state.activeStudent.parentInfo,
          phone: phoneNumber
        }
      }
    });
  }

  private handleParentDetailsEmailChange(email: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        parentInfo: {
          ...this.state.activeStudent.parentInfo,
          email: email
        }
      }
    });
  }

  private handleParentDetailsAdressChange(adress: string) {
    this.handleDetailsError(false);
    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        parentInfo: {
          ...this.state.activeStudent.parentInfo,
          adress: adress
        }
      }
    });
  }

  private handleUploadPhoto(media: File) {
    let files = this.state.studentsMediaFile;
    files.push(media);
    this.setState({
      studentsMediaFile: files
    });
  }

  private handleDeletePhoto(index: any) {
    let studentsMedia = this.state.studentsMediaFile;
    studentsMedia.splice(index, 1);
    this.setState({ studentsMediaFile: studentsMedia });
  }

  private handleDeletePhotoForEditedStudent(index: any, image: string[]) {
    let studentsMedia = this.state.studentsMediaName;
    this.state.studentsMediaDeletedData.push(studentsMedia.splice(index, 1));

    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        studentsMediaFiles: studentsMedia
      }
      // studentsMediaName: studentsMedia
    });
  }

  private handleNotesChange(notes: string[]) {
    let arrayNotes: NotesViewModel[] = [];

    notes.forEach((element, key) => {
      arrayNotes.push(new NotesViewModel(element));
    });

    this.setState({
      activeStudent: {
        ...this.state.activeStudent,
        notes: arrayNotes
      }
    });
  }

  private handleDeleteBtnPressed(): void {
    if (this.state.deleteModalIsOpen) {
    } else {
      this.setState({ deleteModalIsOpen: true });
    }
  }

  private handleSavedBtnPressed(): void {
    this.savePressed = true;
    let detailsError = false;
    const userId = localStorage.getItem("userId");
    if (userId != null) {
      this.state.activeStudent.userId = parseInt(userId);
    }
    if (
      this.state.activeStudent.firstName === "" ||
      this.state.activeStudent.lastName === "" ||
      this.state.activeStudent.gender === "" ||
      this.state.activeStudent.code === 0
    ) {
      this.handleDetailsError(true);
      detailsError = true;
    } else {
      this.handleDetailsError(false);
    }

    if (
      this.state.activeStudent.parentInfo.firstName === "" ||
      this.state.activeStudent.parentInfo.lastName === "" ||
      this.state.activeStudent.parentInfo.adress === "" ||
      this.state.activeStudent.parentInfo.phone === ""
    ) {
      this.handleParentInfoError(true);
      detailsError = true;
    } else {
      this.handleParentInfoError(false);
    }

    if (detailsError) {
      return;
    }

    if (this.state.saveModalIsOpen) {
    } else {
      this.setState({ saveModalIsOpen: true });
    }
  }

  private handleModalClose(): void {
    this.setState({ deleteModalIsOpen: false });
  }

  private handleModalSave(): void {
    this.setState({ saveModalIsOpen: false });
  }

  private handleDetailsError(isError: boolean) {
    let personalInfoTabs = document.getElementById(
      "bp3-tab-title_StudentFormTabs_PersonalInfoTab"
    );
    if (personalInfoTabs) {
      if (isError) {
        personalInfoTabs.classList.replace("student-tab", "student-tab-error");
      } else {
        personalInfoTabs.classList.replace("student-tab-error", "student-tab");
      }
    }
  }

  private handleParentInfoError(isError: boolean) {
    let parentInfoTabs = document.getElementById(
      "bp3-tab-title_StudentFormTabs_ParentInfoTab"
    );
    if (parentInfoTabs) {
      if (isError) {
        parentInfoTabs.classList.replace("student-tab", "student-tab-error");
      } else {
        parentInfoTabs.classList.replace("student-tab-error", "student-tab");
      }
    }
  }

  private handleSubmit(callback?: Function) {
    this.props.studentsStore.AddStudent(
      this.state.activeStudent,
      this.state.studentsMediaFile,
      callback
    );

    this.resetActiveStudentMediaFile();
    this.resetStudent();
    this.resetModal();
  }

  render() {
    return (
      <div className="scrollbarStyle add-edit-student">
        <form encType="multipart/form-data" className="student-form">
          <Tabs id="StudentFormTabs">
            <Tab
              id="PersonalInfoTab"
              title={
                <div>
                  Student Info
                  <Icon icon="error" />
                </div>
              }
              className="student-tab"
              panel={
                <StudentDetails
                  savePressed={this.savePressed}
                  student={this.state.activeStudent}
                  handleStudentDetailsFirstNameChange={this.handleStudentDetailsFirstNameChange.bind(
                    this
                  )}
                  handleStudentDetailsLastNameChange={this.handleStudentDetailsLastNameChange.bind(
                    this
                  )}
                  handleStudentDetailsCodeChange={this.handleStudentDetailsCodeChange.bind(
                    this
                  )}
                  handleStudentDetailsAgeChange={this.handleStudentDetailsAgeChange.bind(
                    this
                  )}
                  handleStudentDetailsPhoneChange={this.handleStudentDetailsPhoneChange.bind(
                    this
                  )}
                  handleStudentDetailsEmailChange={this.handleStudentDetailsEmailChange.bind(
                    this
                  )}
                  handleStudentDetailsAdressChange={this.handleStudentDetailsAdressChange.bind(
                    this
                  )}
                  handleStudentDetailsGenderChange={this.handleStudentDetailsGenderChange.bind(
                    this
                  )}
                />
              }
            />
            <Tab
              id="ParentInfoTab"
              title={
                <div>
                  Parent Info
                  <Icon icon="error" />
                </div>
              }
              className="student-tab"
              panel={
                <ParentDetails
                  savePressed={this.savePressed}
                  student={this.state.activeStudent}
                  handleParentDetailsFirstNameChange={this.handleParentDetailsFirstNameChange.bind(
                    this
                  )}
                  handleParentDetailsLastNameChange={this.handleParentDetailsLastNameChange.bind(
                    this
                  )}
                  handleParentDetailsPhoneChange={this.handleParentDetailsPhoneChange.bind(
                    this
                  )}
                  handleParentDetailsEmailChange={this.handleParentDetailsEmailChange.bind(
                    this
                  )}
                  handleParentDetailsAdressChange={this.handleParentDetailsAdressChange.bind(
                    this
                  )}
                />
              }
            />
            <Tab
              id="MediaTab"
              title="Media"
              className="student-tab"
              panel={
                <StudentMedia
                  handleUploadPhoto={this.handleUploadPhoto.bind(this)}
                  handleDeletePhoto={this.handleDeletePhoto.bind(this)}
                  media={this.state.studentsMediaName}
                  handleDeletePhotoForEditedStudent={this.handleDeletePhotoForEditedStudent.bind(
                    this
                  )}
                />
              }
            />
            <Tab
              id="NotesTab"
              title="Notes"
              className="student-tab"
              panel={
                <StudentNotes
                  student={this.state.activeStudent}
                  handleNotesChange={this.handleNotesChange.bind(this)}
                />
              }
            />
          </Tabs>
          <div className="submit-button">
            {this.props.match.params.id && (
              <React.Fragment>
                <button
                  type="button"
                  className="bp3-button bp3-intent-danger"
                  onClick={this.handleDeleteBtnPressed.bind(this)}
                >
                  Delete
                </button>
                <StudentDeleteModal
                  open={this.state.deleteModalIsOpen}
                  onModalClose={this.handleModalClose.bind(this)}
                  studentId={this.props.match.params.id}
                  studentsStore={this.props.studentsStore}
                />
              </React.Fragment>
            )}
            <React.Fragment>
              <button
                type="button"
                className="bp3-button bp3-intent-primary save-student"
                onClick={this.handleSavedBtnPressed.bind(this)}
              >
                Save
              </button>

              <StudentSaveModel
                open={this.state.saveModalIsOpen}
                handleSubmit={this.handleSubmit.bind(this)}
                onModalClose={this.handleModalSave.bind(this)}
                studentsStore={this.props.studentsStore}
              />
            </React.Fragment>
          </div>
        </form>
      </div>
    );
  }
}
