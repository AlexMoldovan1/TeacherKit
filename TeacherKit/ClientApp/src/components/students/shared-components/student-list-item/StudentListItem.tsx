import * as React from "react";
import { observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import "./student-list-item.css";
import "../student-list-filters/student-list-filters.css";
import { Redirect } from "react-router-dom";
import { StudentQueryViewModel } from "../../../../view-models/student";
import MyIcon from "../../../../shared/student-icon/MyIcon";
import {
  AnchorButton,
  Button,
  Dialog,
  Intent,
  Tooltip,
  Icon
} from "@blueprintjs/core";
import { ClassQueryViewModel } from "src/view-models/class";

interface Props {
  student: StudentQueryViewModel;
  classes: ClassQueryViewModel[];
  waitingForData: boolean;
  handleSetStars: Function;
  handleAddToClass: Function;
  handleChangeClass: Function;
}

interface State {
  redirectTo: string;
  rating: number;
  isOpenStarModal: boolean;
  isOpenAddToClassModal: boolean;
}

@observer
export class StudentListItem extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirectTo: "",
      rating: 0,
      isOpenStarModal: false,
      isOpenAddToClassModal: false
    };
  }

  handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  handleClick(student: StudentQueryViewModel) {
    this.setState({ redirectTo: "/student/" + student.id });
  }

  private handleAddStar(event: any) {
    let updatedStudent = this.props.student;
    updatedStudent.star = true;
    this.props.handleSetStars(updatedStudent);
    this.handleClose();
  }

  private handleDeleteStar(event: any) {
    let updatedStudent = this.props.student;
    updatedStudent.star = false;
    this.props.handleSetStars(updatedStudent);
    this.handleClose();
  }

  private handleAddToClass() {
    this.props.handleAddToClass(this.props.student);
    this.handleCloseAddToClassModal();
  }

  private handleOpen = () => this.setState({ isOpenStarModal: true });

  private handleClose = () => this.setState({ isOpenStarModal: false });

  private handleOpenAddToClassModal = () =>
    this.setState({ isOpenAddToClassModal: true });

  private handleCloseAddToClassModal = () =>
    this.setState({ isOpenAddToClassModal: false });

  private handleChangeClass(e: any) {
    this.props.handleChangeClass(parseInt(e.target.value));
  }

  render() {
    let MakeItem = function(X) {
      return <option>{X}</option>;
    };
    return (
      this.handleRedirect() || (
        <div className="list-item">
          <div onClick={() => this.handleClick(this.props.student)}>
            <MyIcon
              src={this.props.student.iconName}
              className="list-item-photo"
            />
          </div>
          <div
            className="summary_field"
            onClick={() => this.handleClick(this.props.student)}
          >
            {this.props.student.lastName + " " + this.props.student.firstName}
          </div>
          <div className="student-all-button student-button-add-to-class">
            <Tooltip content="Add to class" position="bottom">
              <Icon
                onClick={this.handleOpenAddToClassModal}
                icon="add-to-artifact"
                iconSize={30}
              />
            </Tooltip>

            <Dialog
              className="bp3-dialog-header"
              onClose={this.handleCloseAddToClassModal}
              isOpen={this.state.isOpenAddToClassModal}
            >
              <div className="buttons-side">
                <div className="bp3-dialog-body">
                  <span className="addStarColor">
                    {this.props.student.lastName +
                      " " +
                      this.props.student.firstName +
                      " will be added to class: "}
                  </span>
                  <select
                    className="select_search filter-common"
                    onChange={this.handleChangeClass.bind(this)}
                    defaultValue=""
                  >
                    <option value="" defaultValue="Classes" disabled hidden>
                      Classes
                    </option>
                    {this.props.classes.map(classModel => (
                      <option
                        key={classModel.id}
                        value={classModel.id}
                        defaultValue="Gender"
                      >
                        {classModel.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="buttonAddStar">
                  <Button
                    className="bp3-button"
                    onClick={this.handleCloseAddToClassModal}
                  >
                    Undo
                  </Button>
                  <AnchorButton
                    className="bp3-button bp3-intent-primary "
                    onClick={this.handleAddToClass.bind(this)}
                    intent={Intent.PRIMARY}
                    target="_blank"
                  >
                    Ok
                  </AnchorButton>
                </div>
              </div>
            </Dialog>
          </div>
          {this.props.student.star ? (
            <div>
              <div className="student-all-button student-button-star">
                <Tooltip content="Remove from star students" position="bottom">
                  <Icon
                    icon="star"
                    onClick={this.handleOpen}
                    iconSize={30}
                    className="active iconStar"
                  />
                </Tooltip>
              </div>
              <Dialog
                className="bp3-dialog-header"
                onClose={this.handleClose}
                isOpen={this.state.isOpenStarModal}
              >
                <div className="buttons-side">
                  <div className="bp3-dialog-body">
                    <span className="addStarColor">
                      {this.props.student.lastName +
                        " " +
                        this.props.student.firstName}
                    </span>{" "}
                    has been removed from star students!
                  </div>
                  <div className="buttonAddStar">
                    <Button className="bp3-button" onClick={this.handleClose}>
                      Undo
                    </Button>
                    <AnchorButton
                      className="bp3-button bp3-intent-primary"
                      onClick={this.handleDeleteStar.bind(this)}
                      intent={Intent.PRIMARY}
                      target="_blank"
                    >
                      Ok
                    </AnchorButton>
                  </div>
                </div>
              </Dialog>
            </div>
          ) : (
            <div>
              <div className="student-all-button student-button-star">
                <Tooltip content="Add to star students" position="bottom">
                  <Icon
                    icon="star"
                    onClick={this.handleOpen}
                    iconSize={30}
                    className="normal iconStar"
                  />
                </Tooltip>
              </div>
              <Dialog
                className="bp3-dialog-header"
                onClose={this.handleClose}
                isOpen={this.state.isOpenStarModal}
              >
                <div className="buttons-side">
                  <div className="bp3-dialog-body">
                    <span className="addStarColor">
                      {this.props.student.lastName +
                        " " +
                        this.props.student.firstName}
                    </span>{" "}
                    has been added to star students!
                  </div>
                  <div className="buttonAddStar">
                    <Button className="bp3-button" onClick={this.handleClose}>
                      Undo
                    </Button>
                    <AnchorButton
                      className="bp3-button bp3-intent-primary "
                      onClick={this.handleAddStar.bind(this)}
                      intent={Intent.PRIMARY}
                      target="_blank"
                    >
                      Ok
                    </AnchorButton>
                  </div>
                </div>
              </Dialog>
            </div>
          )}
        </div>
      )
    );
  }
}
