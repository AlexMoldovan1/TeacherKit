import * as React from "react";
import Modal from "react-responsive-modal";
import { Icon, Spinner } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { ClassesStore } from "../../../store/class-store";

interface ClassSaveModelProps {
  open: boolean;
  onModalClose: () => void;
  handleSubmit: Function;
  classesStore: ClassesStore;
}

interface ClassSaveModelState {
  responseHasArrived: boolean;
  requestHasBeenSent: boolean;
}

const initialState = {
  responseHasArrived: false,
  requestHasBeenSent: false
};

export class ClassSaveModal extends React.Component<
  ClassSaveModelProps,
  ClassSaveModelState
> {
  constructor(props: ClassSaveModelProps) {
    super(props);
    this.state = initialState;
  }

  private saveClass(): void {
    this.props.handleSubmit(() => {
      this.setState({ responseHasArrived: true });
    });

    this.setState({ requestHasBeenSent: true });
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={() =>
          !this.state.requestHasBeenSent && this.props.onModalClose()
        }
        center
        showCloseIcon={!this.state.requestHasBeenSent}
      >
        <div className="student-delete-modal-content">
          {!this.state.requestHasBeenSent && (
            <React.Fragment>
              <div className="confirmation-text">
                Are you sure you want to add this class?
              </div>
              <div className="submit-button">
                <button
                  type="button"
                  onClick={this.props.onModalClose}
                  className="bp3-button bp3-intent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={this.saveClass.bind(this)}
                  className="bp3-button bp3-intent-success"
                >
                  Save
                </button>
              </div>
            </React.Fragment>
          )}
          {this.state.requestHasBeenSent && !this.state.responseHasArrived && (
            <React.Fragment>
              <div>Saving this class...</div>
              <Spinner size={Spinner.SIZE_LARGE} />
            </React.Fragment>
          )}

          {this.state.requestHasBeenSent &&
            this.state.responseHasArrived &&
            this.props.classesStore.statusCode == 200 && (
              <React.Fragment>
                <Icon icon="tick-circle" className="big-icon ok" />
                <span className="ok">The Class was successfully saved!</span>
                <div className="submit-button">
                  <Link
                    className="bp3-button bp3-intent-success"
                    to="/classes/all"
                  >
                    Ok
                  </Link>
                </div>
              </React.Fragment>
            )}

          {this.state.requestHasBeenSent &&
            this.state.responseHasArrived &&
            this.props.classesStore.statusCode == 500 && (
              <React.Fragment>
                <Icon icon="delete" className="big-icon err" />
                <span className="err">
                  A problem occurred during the current operation. The class
                  could not be saved!
                </span>
                <div className="submit-button">
                  <button
                    type="button"
                    onClick={this.props.onModalClose}
                    className="bp3-button bp3-intent"
                  >
                    Close
                  </button>
                </div>
              </React.Fragment>
            )}
        </div>
      </Modal>
    );
  }
}

export default ClassSaveModal;
