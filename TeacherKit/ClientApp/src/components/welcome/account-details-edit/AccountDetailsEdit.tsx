import * as React from "react";
import { UserStore } from "../../../store/user-store";
import { Icon, Tab, Tabs } from "@blueprintjs/core";
import { UserCommandViewModel } from "../../../view-models/user";
import { ErrView } from "./ErrView";
import { inject, observer } from "mobx-react";
import "../account-details/account-details.css";
import { Link, Redirect } from "react-router-dom";
import { ReactNode } from "react";
import { ConfirmModal } from "./ConfirmModal";

interface Props {
  userStore: UserStore;
}

interface State {
  editedUser: UserCommandViewModel;
  err: UserCommandViewModel;
  updateResponseMsg: string;
  updateWasSuccessful: boolean;
  responseHasBeenReceived: boolean;
  redirect: ReactNode;
}

function getInitialState(): State {
  return {
    editedUser: new UserCommandViewModel({}),
    err: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      repeatPassword: ""
    },
    updateResponseMsg: "",
    updateWasSuccessful: false,
    responseHasBeenReceived: false,
    redirect: undefined
  };
}

@inject("userStore")
@observer
export class AccountDetailsEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (this.props.userStore.user == undefined) {
      this.props.userStore.loadUserFromLocalStorage();
    }
    this.state = getInitialState();
    this.state.editedUser.id = this.props.userStore.user.id;
    this.state.editedUser.firstName = this.props.userStore.user.firstName;
    this.state.editedUser.lastName = this.props.userStore.user.lastName;
    this.state.editedUser.email = this.props.userStore.user.email;
  }

  private handleSubmitChanges(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.userStore.updateUser(this.state.editedUser, () => {
        let { err, updateWasSuccessful } = this.state;
        let updateResponseMsg = "";
        const statusCode = this.props.userStore.statusCode;
        let responseHasBeenReceived = false;
        switch (statusCode) {
          case 401:
            err.oldPassword = "Invalid password";
            updateWasSuccessful = false;
            break;
          case 400:
            updateResponseMsg = "Ill-formed request";
            updateWasSuccessful = false;
            responseHasBeenReceived = true;
            break;
          case 500:
            updateResponseMsg =
              "The request could not be completed due to an unknown error";
            updateWasSuccessful = false;
            responseHasBeenReceived = true;
            break;
          case 200:
            updateResponseMsg = "The user was successfully updated";
            updateWasSuccessful = true;
            responseHasBeenReceived = true;
            break;
        }
        this.setState({
          err: err,
          updateResponseMsg: updateResponseMsg,
          updateWasSuccessful: updateWasSuccessful,
          responseHasBeenReceived: responseHasBeenReceived
        });
      });
    }
  }

  private validateForm() {
    let err = new UserCommandViewModel({});
    const editedUser = this.state.editedUser;
    let ok = true;
    if (!editedUser.firstName) {
      err.firstName = "First Name required";
      ok = false;
    }
    if (!editedUser.lastName) {
      err.lastName = "Last Name required";
      ok = false;
    }
    if (!editedUser.email) {
      err.email = "Email required";
      ok = false;
    }
    if (!editedUser.oldPassword) {
      err.oldPassword = "Old Password required";
      ok = false;
    }
    if (!editedUser.newPassword) {
      err.newPassword = "New Password required";
      ok = false;
    }
    if (!editedUser.repeatPassword) {
      err.repeatPassword = "Password confirmation required";
      ok = false;
    }
    if (
      err.repeatPassword == undefined &&
      editedUser.newPassword != editedUser.repeatPassword
    ) {
      err.repeatPassword = "New Password does not match Repeat Password field";
      ok = false;
    }
    this.setState({ err: err });
    return ok;
  }

  private handleRedirect() {
    this.props.userStore.logIn(
      {
        email: this.state.editedUser.email,
        password: this.state.editedUser.newPassword
      },
      () => {
        this.setState({ redirect: <Redirect to="/account/details/view" /> });
      }
    );
  }

  render() {
    const { editedUser, err } = this.state;
    return (
      <div>
        {this.state.redirect}
        {this.state.updateWasSuccessful && (
          <ConfirmModal
            msg={this.state.updateResponseMsg}
            onOkClick={this.handleRedirect.bind(this)}
          />
        )}
        <form onSubmit={this.handleSubmitChanges.bind(this)}>
          <Tabs id="accDetEditTabs" className="account-details-tabs">
            <Tab
              id="accDetEditTab"
              title="Edit Account Details"
              className="account-details-tab"
              panel={
                <React.Fragment>
                  <span className="glyphicon glyphicon-user user-placeholder" />
                  <div className="user-details">
                    <label>First Name *</label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={editedUser.firstName}
                      onChange={event =>
                        (editedUser.firstName = event.target.value)
                      }
                      maxLength={50}
                    />
                    <ErrView errMsg={err.firstName} />
                    <label>Last Name *</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={editedUser.lastName}
                      onChange={event =>
                        (editedUser.lastName = event.target.value)
                      }
                      maxLength={50}
                    />
                    <ErrView errMsg={err.lastName} />
                    <label>Email *</label>
                    <input
                      type="text"
                      placeholder="Email"
                      value={editedUser.email}
                      onChange={event =>
                        (editedUser.email = event.target.value)
                      }
                      maxLength={50}
                    />
                    <ErrView errMsg={err.email} />
                  </div>
                  <h1>Change password</h1>
                  <div className="user-details">
                    <label>Old Password *</label>
                    <input
                      type="password"
                      placeholder="Old Password"
                      value={editedUser.oldPassword}
                      onChange={event =>
                        (editedUser.oldPassword = event.target.value)
                      }
                    />
                    <ErrView errMsg={err.oldPassword} />
                    <label>New Password *</label>
                    <input
                      type="password"
                      placeholder="New Password"
                      value={editedUser.newPassword}
                      onChange={event =>
                        (editedUser.newPassword = event.target.value)
                      }
                    />
                    <ErrView errMsg={err.newPassword} />
                    <label>Repeat Password *</label>
                    <input
                      type="password"
                      placeholder="Repeat Password"
                      value={editedUser.repeatPassword}
                      onChange={event =>
                        (editedUser.repeatPassword = event.target.value)
                      }
                    />
                    <ErrView errMsg={err.repeatPassword} />
                  </div>
                </React.Fragment>
              }
            />
          </Tabs>
          <div className="submit-button">
            {this.state.responseHasBeenReceived &&
              !this.state.updateWasSuccessful && (
                <React.Fragment>
                  <Icon icon="delete" className="err" />
                  <span className="err">{this.state.updateResponseMsg}</span>
                </React.Fragment>
              )}
            <Link
              to="/account/details/view"
              type="button"
              className="bp3-button bp3-intent cancel"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bp3-button bp3-intent-primary submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
