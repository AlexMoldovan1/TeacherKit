import * as React from "react";
import { StudentsStore } from "../../../store/students-store";
import { inject, observer } from "mobx-react";
import "./student-view.css";
import "../shared-components/student-list-item/student-list-item.css";
import { StudentQueryViewModel } from "../../../view-models/student";
import { Icon, Overlay, Tooltip } from "@blueprintjs/core";
import Lightbox from "lightbox-react";
import { Redirect } from "react-router-dom";
import { LightboxVideoComponent } from "./student-view-elements/LightboxComponent";
import { Media } from "./student-view-elements/Media";
import { Details } from "./student-view-elements/Details";
import { Notes } from "./student-view-elements/Notes";

interface Match {
  params: {
    id: number;
  };
}

interface Props {
  studentsStore: StudentsStore;

  match: Match;
}

interface State {
  isOpenNotes: boolean;
  isOpenSteps: boolean;
  isOpenImage: boolean;
  isOpenVideo: boolean;
  checked: boolean[];

  activeStudent: StudentQueryViewModel;

  photoIndex: number;

  redirectTo: string;
}

const initialState: State = {
  isOpenNotes: false,
  isOpenSteps: false,
  isOpenImage: false,
  isOpenVideo: false,
  checked: [],
  activeStudent: {
    id: 0,
    firstName: "",
    lastName: "",
    code: 0,
    age: 0,
    gender: "F",
    phone: "",
    email: "",
    adress: "",
    star: false,
    classModelId: 0,
    parentInfo: {
      id: 0,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      adress: ""
    },
    notes: [],
    studentsMedia: [],
    studentsMediaFiles: [],
    iconName: ""
  },
  photoIndex: 0,
  redirectTo: ""
};

@inject("studentsStore")
@observer
export class StudentView extends React.Component<Props, State> {
  private images;

  constructor(props: Props) {
    super(props);
    this.state = initialState;

    let studentId = props.match.params.id;
    if (studentId) {
      this.props.studentsStore.loadActiveStudent(
        studentId,
        this.loadStudent.bind(this)
      );
    }

    this.images = this.state.activeStudent.studentsMedia;
  }

  private loadStudent(student: StudentQueryViewModel): void {
    this.setState({
      activeStudent: student
    });
  }

  private handleOpenNotes = () => this.setState({ isOpenNotes: true });

  private handleCloseNotes = () => this.setState({ isOpenNotes: false });

  private handleOpenSteps = () => this.setState({ isOpenSteps: true });

  private handleCloseSteps = () => this.setState({ isOpenSteps: false });

  private handleOpenImage = index =>
    this.setState({ isOpenImage: true, photoIndex: index });

  private handleEditClick = () => {
    this.setState({
      redirectTo: "/students/edit/" + this.state.activeStudent.id
    });
  };

  private handleShoppingCartClick = () => {
    this.setState({
      redirectTo: "/shoppingList/addRecipe/" + this.state.activeStudent.id
    });
  };

  private handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return null;
  }

  private isVideo(src) {
    return src.endsWith("mp4");
  }

  private hasImages() {
    return (
      this.state.isOpenImage &&
      this.state.activeStudent.studentsMedia.length > 0 &&
      (this.images = this.state.activeStudent.studentsMedia)
    );
  }

  private handleCloseLightbox = () => this.setState({ isOpenImage: false });
  private handleNextImage = () =>
    this.setState({
      photoIndex: (this.state.photoIndex + 1) % this.images.length
    });
  private handlePrevImage = () =>
    this.setState({
      photoIndex:
        (this.state.photoIndex + this.images.length - 1) % this.images.length
    });

  private showLightbox() {
    return (
      <Lightbox
        mainSrc={
          this.isVideo(this.images[this.state.photoIndex].imageName) ? (
            <LightboxVideoComponent
              src={this.images[this.state.photoIndex].imageName}
            />
          ) : (
            "/Images/" + this.images[this.state.photoIndex].imageName
          )
        }
        nextSrc={
          this.isVideo(
            this.images[(this.state.photoIndex + 1) % this.images.length]
              .imageName
          ) ? (
            <LightboxVideoComponent
              src={
                this.images[(this.state.photoIndex + 1) % this.images.length]
                  .imageName
              }
            />
          ) : (
            "/Images/" +
            this.images[(this.state.photoIndex + 1) % this.images.length]
              .imageName
          )
        }
        prevSrc={
          this.isVideo(
            this.images[
              (this.state.photoIndex + this.images.length - 1) %
                this.images.length
            ].imageName
          ) ? (
            <LightboxVideoComponent
              src={
                this.images[
                  (this.state.photoIndex + this.images.length - 1) %
                    this.images.length
                ].imageName
              }
            />
          ) : (
            "/Images/" +
            this.images[
              (this.state.photoIndex + this.images.length - 1) %
                this.images.length
            ].imageName
          )
        }
        onCloseRequest={this.handleCloseLightbox}
        enableZoom={false}
        onMoveNextRequest={this.handleNextImage}
        onMovePrevRequest={this.handlePrevImage}
      />
    );
  }

  private showNotesOverlay() {
    return (
      <Overlay
        isOpen={this.state.isOpenNotes}
        hasBackdrop={false}
        autoFocus={true}
        usePortal={false}
      >
        <div className="overlay-content">
          <div className="minimize-button">
            <Icon
              color="#f25800"
              icon="minimize"
              iconSize={20}
              onClick={this.handleCloseNotes}
            />
          </div>
          <br />
          <Notes notes={this.state.activeStudent.notes} />
        </div>
      </Overlay>
    );
  }

  private showStepsOverlay() {
    return (
      <Overlay
        isOpen={this.state.isOpenSteps}
        hasBackdrop={false}
        autoFocus={true}
        usePortal={false}
      >
        <div className="overlay-content">
          <div className="minimize-button">
            <Icon
              color="#f25800"
              icon="minimize"
              iconSize={20}
              onClick={this.handleCloseSteps}
            />
          </div>
          <br />
          {/* <Steps steps={this.state.activeRecipe.steps} styleClass="big-steps" /> */}
        </div>
      </Overlay>
    );
  }

  private displayMedia(index) {
    return (
      <Media
        src={this.state.activeStudent.studentsMedia[index].imageName}
        index={index}
        handleOpenImage={this.handleOpenImage}
      />
    );
  }

  private showImages() {
    return (
      <div className="column media-container border-section">
        <div className="row big-image">
          <div className="column big-image">
            {this.state.activeStudent.studentsMedia.length > 0 &&
              this.displayMedia(0)}
          </div>
        </div>
        <div className="row no-margin">
          <div className="column small-image">
            {this.state.activeStudent.studentsMedia.length > 1 ? (
              this.displayMedia(1)
            ) : (
              <img src="/UtilsImages/placeholder.png" />
            )}
          </div>
          <div className="column small-image">
            {this.state.activeStudent.studentsMedia.length > 2 ? (
              this.displayMedia(2)
            ) : (
              <img src="/UtilsImages/placeholder.png" />
            )}
          </div>
        </div>
      </div>
    );
  }

  private showNotes() {
    return (
      <div className="column border-section">
        <div className="student-expand-button">
          <Icon
            color="#f25800"
            icon="maximize"
            iconSize={20}
            onClick={this.handleOpenNotes}
          />
        </div>
        <div className="bookmark-icon">
          <Icon color="#f25800" icon="bookmark" iconSize={50} />
        </div>
        <Notes notes={this.state.activeStudent.notes} />
      </div>
    );
  }

  private showSteps() {
    return (
      <div className="column border-section">
        <div className="student-expand-button">
          <Icon
            color="#f25800"
            icon="maximize"
            iconSize={20}
            onClick={this.handleOpenSteps}
          />
        </div>
        <div className="bookmark-icon">
          <Icon color="#f25800" icon="bookmark" iconSize={50} />
        </div>
        {/* <Steps steps={this.state.activeRecipe.steps} styleClass="small-steps" /> */}
      </div>
    );
  }

  private handleDeleteStars = () => {
    this.setState({
      activeStudent: { ...this.state.activeStudent, star: false, iconName: "" }
    });
    let updatedStudent = this.state.activeStudent;
    updatedStudent.star = false;

    this.props.studentsStore.UpdateStudent(this.state.activeStudent);
  };

  private handleSetStars = () => {
    this.setState({
      activeStudent: { ...this.state.activeStudent, star: true, iconName: "" }
    });
    let updatedStudent = this.state.activeStudent;
    updatedStudent.star = true;
    this.props.studentsStore.UpdateStudent(updatedStudent);
  };
  render() {
    return (
      this.handleRedirect() || (
        <div className="view-container">
          <div className="row">
            <div className="column heading-column">
              <h1 className="heading">
                {this.state.activeStudent.lastName +
                  " " +
                  this.state.activeStudent.firstName}
              </h1>
              <div className="icon" onClick={this.handleEditClick}>
                <Tooltip content="Edit student" position="top">
                  <Icon icon="edit" iconSize={30} />
                </Tooltip>
              </div>
              <div className="icon" onClick={this.handleShoppingCartClick}>
                <Tooltip content="Add to class" position="top">
                  <Icon icon="add-to-artifact" iconSize={30} />
                </Tooltip>
              </div>

              {this.state.activeStudent.star ? (
                <div className="icon">
                  <Tooltip content="Remove from stars students" position="top">
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
                  <Tooltip content="Add to stars students" position="top">
                    <Icon
                      icon="star"
                      onClick={this.handleSetStars}
                      iconSize={30}
                      className="normal"
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>

          {this.hasImages() && this.showLightbox()}
          {this.showNotesOverlay()}
          {this.showStepsOverlay()}

          <div className="row">
            {this.showImages()}
            <Details activeStudent={this.state.activeStudent} />
            {this.showNotes()}
          </div>
          <div className="row">{this.showSteps()}</div>
        </div>
      )
    );
  }
}
