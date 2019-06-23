import * as React from "react";
import { observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import "./class-list-item.css";
import { Redirect } from "react-router-dom";
import { ClassQueryViewModel } from "../../../../view-models/class";
import MyIcon from "../../../../shared/student-icon/MyIcon";
import {
  AnchorButton,
  Button,
  Dialog,
  Intent,
  Tooltip,
  Icon
} from "@blueprintjs/core";

interface Props {
  class: ClassQueryViewModel;
  waitingForData: boolean;
  handleSetStars: Function;
}

interface State {
  redirectTo: string;
  rating: number;
  isOpen: boolean;
}

@observer
export class ClassListItem extends React.Component<Props, State> {
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

  handleClick(classModel: ClassQueryViewModel) {
    this.setState({ redirectTo: "/class/" + classModel.id });
  }

  private handleAddStar(event: any) {
    let updatedClass = this.props.class;
    updatedClass.stars = true;
    this.props.handleSetStars(updatedClass);
    this.handleClose();
  }

  private handleDeleteStar(event: any) {
    let updatedClass = this.props.class;
    updatedClass.stars = false;
    this.props.handleSetStars(updatedClass);
    this.handleClose();
  }

  private handleOpen = () => this.setState({ isOpen: true });

  private handleClose = () => this.setState({ isOpen: false });

  render() {
    return (
      this.handleRedirect() || (
        <div className="list-item">
          <div onClick={() => this.handleClick(this.props.class)}>
            <MyIcon
              src={this.props.class.iconName}
              className="list-item-photo-class"
            />
          </div>
          <div
            className="summary_field"
            onClick={() => this.handleClick(this.props.class)}
          >
            {this.props.class.title}
          </div>
          {this.props.class.stars ? (
            <div>
              <div className="class-all-button class-button-star">
                <Tooltip content="Remove from star classes" position="bottom">
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
                {...this.state}
              >
                <div className="buttons-side">
                  <div className="bp3-dialog-body">
                    <span className="addStarColor">
                      {this.props.class.title}
                    </span>{" "}
                    has been removed from star classes!
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
              <div className="class-all-button class-button-star">
                <Tooltip content="Add to star classes" position="bottom">
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
                {...this.state}
              >
                <div className="buttons-side">
                  <div className="bp3-dialog-body">
                    <span className="addStarColor">
                      {this.props.class.title}
                    </span>{" "}
                    has been added to star classes!
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
