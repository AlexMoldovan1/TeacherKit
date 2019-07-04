import * as React from "react";
import { inject, observer } from "mobx-react";
import { ViewStore } from "../../store/view-store";
import { Button, Icon, InputGroup, Tooltip } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import "./login.css";
import { UserViewModel } from "../../view-models/user";
import { UserStore } from "../../store/user-store";
import students from "../../shared/UtilsImages/students.png";
import Bg from "../../loginBackground.jpg";

interface Props {
  userStore: UserStore;
  viewStore: ViewStore;
}

interface State {
  username: string;
  password: string;
  logged: boolean;
}

@inject("viewStore")
@inject("userStore")
@observer
export class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { username: "", password: "", logged: true };
  }

  private loadUser(): void {
    if (this.props.userStore.user.tokenGuid == null) {
      this.setState({ logged: false });
      return;
    } else {
      this.setState({ logged: true });
      localStorage.setItem("logged", this.props.userStore.user.tokenGuid);
    }
    localStorage.setItem("user", JSON.stringify(this.props.userStore.user));
    localStorage.setItem(
      "userId",
      JSON.stringify(this.props.userStore.user.id)
    );
    window.location.href = "/";
  }

  private handleUserLogin(): void {
    this.props.userStore.logIn(
      new UserViewModel("", "", this.state.username, this.state.password, ""),
      this.loadUser.bind(this)
    );
  }

  private changeUsername(e: any): void {
    this.setState({ username: e.target.value });
  }

  private changePassword(e: any): void {
    this.setState({ password: e.target.value });
  }

  private errorMessage(error: string) {
    return error !== "" ? (
      <div className="error ">
        <Icon icon="delete" />
        <span className="error-message">{error}</span>
      </div>
    ) : null;
  }

  render() {
    const mailButton = (
      <Tooltip content={"Email"}>
        <Icon icon={"envelope"} iconSize={50} className="position-icon" />
      </Tooltip>
    );
    const lockButton = (
      <Tooltip content={"Password"}>
        <Icon icon={"lock"} iconSize={50} className="position-icon-pass" />
      </Tooltip>
    );
    return (
      <React.Fragment>
        <img className="background-image" src={Bg} alt="no img" />
        <img style={{ width: 250, height: 250 }} src={students} alt="no img" />
        <div className="formUsername">
          <InputGroup
            placeholder="Enter your username..."
            rightElement={mailButton}
            className="username font-size"
            onChange={this.changeUsername.bind(this)}
          />
          <InputGroup
            placeholder="Enter your password..."
            type={"password"}
            rightElement={lockButton}
            className="password font-size"
            onChange={this.changePassword.bind(this)}
          />
        </div>

        {this.state.logged ? (
          <div />
        ) : (
          this.errorMessage("Invalid email or password!")
        )}
        <div>
          <Button
            className="button-all"
            onClick={this.handleUserLogin.bind(this)}
          >
            Log In
          </Button>
        </div>
        <div>
          <Link to="/user/register">
            <Button className="button-all textDecoration">Register</Button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
