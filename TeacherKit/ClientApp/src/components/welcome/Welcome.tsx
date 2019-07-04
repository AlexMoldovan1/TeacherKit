import * as React from "react";
import {
  Button,
  Popover,
  Menu,
  MenuItem
} from "../../../node_modules/@blueprintjs/core";
import { UserViewModel } from "../../view-models/user";
import { UserStore } from "../../store/user-store";
import "./welcome.css";
import { Redirect } from "react-router";
import { ReactNode } from "react";

interface Props {
  updateState: Function;
  renderWelcomeUser: Function;
  userStore: UserStore;
}

interface State {
  redirect: ReactNode;
}

const initialState: State = {
  redirect: undefined
};

class Welcome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private handleClickEvent(): any {
    localStorage.setItem("logged", "");
    var nullCheck = localStorage.getItem("user");
    if (nullCheck == null) {
    } else {
      var user: any = JSON.parse(nullCheck);
    }
    const currentUser = new UserViewModel(
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.tokenGuid
    );
    this.props.userStore.logOut(currentUser);
    this.props.updateState();
    localStorage.setItem("user", JSON.stringify(""));
    localStorage.setItem("userId", JSON.stringify(""));
    window.location.href = "/user/login";
  }

  private handleRedirect(destinationTab: string) {
    const destinationURL = "/account/" + destinationTab;
    this.setState({ redirect: <Redirect to={destinationURL} /> }, () => {
      this.setState({ redirect: undefined });
    });
  }

  render() {
    return this.state.redirect ? (
      this.state.redirect
    ) : (
      <React.Fragment>
        <label className="WelcomeTop">My Classes</label>
        <Popover
          className="positioning"
          content={
            <Menu className="hoverMenu">
              <MenuItem
                text="Account details"
                icon="user"
                onClick={() => this.handleRedirect("details/view")}
              />
              <MenuItem text="Settings" icon="settings" />
              <MenuItem text="Notifications" icon="notifications" />
              <MenuItem
                text="Log out"
                icon="log-out"
                onClick={this.handleClickEvent.bind(this)}
              />
            </Menu>
          }
        >
          <Button
            icon="chevron-down"
            className="backColor"
            text={this.props.renderWelcomeUser()}
          />
        </Popover>
      </React.Fragment>
    );
  }
}

export default Welcome;
