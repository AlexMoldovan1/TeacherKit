import * as React from "react";
import { observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import "./student-list-item.css";
import { Redirect } from "react-router-dom";
import { StudentQueryViewModel } from "../../../../view-models/student";
import MyIcon from "../../../../shared/student-icon/MyIcon";
import { AnchorButton, Button, Dialog, Intent } from "@blueprintjs/core";

interface Props {
  student: StudentQueryViewModel;
  waitingForData: boolean;
  handleSetStars: Function;
}

interface State {
  redirectTo: string;
  rating: number;
  isOpen: boolean;
}

@observer
export class StudentListItem extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirectTo: "",
      rating: 0,
      isOpen: false
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

  private handleOpen = () => this.setState({ isOpen: true });

  private handleClose = () => this.setState({ isOpen: false });

  render() {
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
          {this.props.student.star ? (
            <div>
              <button
                type="button"
                className="student-all-button student-button-rating active"
                onClick={this.handleOpen}
              >
                &#9733;
              </button>
              <Dialog
                className="bp3-dialog-header"
                onClose={this.handleClose}
                {...this.state}
              >
                <div>
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
              <button
                type="button"
                className="student-all-button student-button-rating normal "
                onClick={this.handleOpen}
              >
                &#9733;
              </button>
              <Dialog
                className="bp3-dialog-header"
                onClose={this.handleClose}
                {...this.state}
              >
                <div>
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
