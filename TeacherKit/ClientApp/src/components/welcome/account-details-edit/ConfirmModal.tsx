import * as React from "react";
import Modal from "react-responsive-modal";
import { Icon } from "@blueprintjs/core";
import { ReactNode } from "react";

interface Props {
  msg: string;
  onOkClick?: () => void;
}

interface State {
  redirect: ReactNode;
}

const initialState: State = {
  redirect: undefined
};

export class ConfirmModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <Modal open={true} center={true} onClose={() => {}}>
        {this.state.redirect}
        <div>
          <Icon icon="tick-circle" className="ok" />
          <span className="ok">{this.props.msg}</span>
          <div className="submit-button">
            <button
              type="button"
              className="bp3-button bp3-intent-success"
              onClick={this.props.onOkClick}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
