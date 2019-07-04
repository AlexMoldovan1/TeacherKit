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
import { Tooltip, Icon, Overlay } from "@blueprintjs/core";
import { Media } from "src/components/students/student-view/student-view-elements/Media";
import { CatalogView } from "./class-view-elements/CatalogView";
import { Redirect } from "react-router";
import { HeaderTabs } from "src/view-models/header-tabs";
import { LightboxVideoComponent } from "src/components/students/student-view/student-view-elements/LightboxComponent";

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
  isOpenArchive: boolean;
  isOpenImageFromArchive: boolean;
  photoIndex: number;
}

const initialState: State = {
  students: [],
  redirectTo: "",
  photoIndex: 0,
  waitingForData: false,
  isOpenImage: false,
  isOpenArchive: false,
  isOpenImageFromArchive: false,
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
    iconName: "",
    userId: 0
  }
};

@inject("viewStore")
@inject("studentsStore")
@inject("classesStore")
@observer
export class ClassView extends React.Component<Props, State> {
  private images;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
    this.loadStudentsByClassId();
    this.loadActiveClass();
    this.props.viewStore.changeActiveClassesTab(ClassesTabs.all);
  }

  componentWillMount() {
    this.props.viewStore.changeActiveHeaderTab(HeaderTabs.classes);
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
    this.images = classModel.classMediaQueryModel;
  }

  private loadStudents(students: StudentQueryViewModel[]): void {
    this.setState({
      students: students,
      waitingForData: true
    });
  }

  private handleOpenImage = index => this.setState({ isOpenImage: true });

  private handleOpenImageFromArchive(index: any) {
    this.setState({ isOpenImageFromArchive: true, photoIndex: index });
  }

  private hasImages() {
    return (
      this.state.isOpenImage &&
      this.state.activeClass.classIconQueryModel.imageName != ""
    );
  }

  private hasImagesInArchive() {
    return this.state.isOpenImageFromArchive && this.images.length > 0;
  }

  private handleOpenArchiveMedia = () => this.setState({ isOpenArchive: true });

  private handleCloseArchiveMedia = () =>
    this.setState({ isOpenArchive: false });

  private isVideo(src) {
    return src.endsWith("mp4");
  }

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

  private handleCloseLightboxFromArchive = () =>
    this.setState({ isOpenImageFromArchive: false });

  private handleNextImage = () =>
    this.setState({
      photoIndex: (this.state.photoIndex + 1) % this.images.length
    });

  private handlePrevImage = () =>
    this.setState({
      photoIndex:
        (this.state.photoIndex + this.images.length - 1) % this.images.length
    });

  private showLightboxForArchive() {
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
        onCloseRequest={this.handleCloseLightboxFromArchive}
        enableZoom={false}
        onMoveNextRequest={this.handleNextImage}
        onMovePrevRequest={this.handlePrevImage}
      />
    );
  }

  private handleEditClick = () => {
    // this.setState({
    // redirectTo: "/classes/edit/" + this.state.activeClass.id
    // });
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
      activeClass: { ...this.state.activeClass, stars: true, iconName: "" }
    });
    let updatedClass = this.state.activeClass;
    updatedClass.stars = true;
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

  private showArchiveMediaOverlay() {
    return (
      <Overlay
        isOpen={this.state.isOpenArchive}
        hasBackdrop={false}
        autoFocus={true}
        usePortal={false}
        canOutsideClickClose={this.state.isOpenImageFromArchive ? false : true}
        onClose={this.handleCloseArchiveMedia}
      >
        <div className="overlay-content-archive">
          <div className="minimize-button">
            <Icon
              color="#f25800"
              icon="cross"
              iconSize={20}
              onClick={this.handleCloseArchiveMedia}
            />
          </div>
          <ul className="media-archive-list">
            {this.images.map((mediaModel, index) => {
              return (
                <li className="liForMedia" key={index}>
                  <div
                    key={index}
                    className="divForMedia"
                    onClick={() => this.handleOpenImageFromArchive(index)}
                  >
                    {this.isVideo(mediaModel.imageName) ? (
                      <img
                        className="media-from-archive"
                        src={"/UtilsImages/play.png"}
                        alt="no img"
                      />
                    ) : (
                      <img
                        className="media-from-archive"
                        src={"/Images/" + mediaModel.imageName}
                        alt="no img"
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Overlay>
    );
  }

  private showClassInformation() {
    return (
      this.handleRedirect() || (
        <div className="icon-container border-section-class">
          <div className="column">
            <div className="heading-column">
              <h1 className="heading-class-title">
                <label className="label-title">
                  {this.state.activeClass.title}
                </label>
                <div className="icon" onClick={this.handleOpenArchiveMedia}>
                  <Tooltip content="Show media" position="top">
                    <Icon icon="media" iconSize={30} />
                  </Tooltip>
                </div>
                <div className="icon" onClick={this.handleEditClick}>
                  <Tooltip content="Edit class" position="top">
                    <Icon icon="edit" iconSize={30} />
                  </Tooltip>
                </div>
                {this.state.activeClass.stars ? (
                  <div className="icon">
                    <Tooltip content="Remove from star classes" position="top">
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
                    <Tooltip content="Add to star classes" position="top">
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

        {this.state.isOpenArchive && this.showArchiveMediaOverlay()}

        {this.hasImagesInArchive() && this.showLightboxForArchive()}

        <div className="row">
          {this.showClassInformation()}
          <CatalogView
            students={this.state.students}
            waitingForDate={this.state.waitingForData}
          />
        </div>
      </div>
    );
  }
}
