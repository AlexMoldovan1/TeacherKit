import * as React from "react";
import { Link } from "react-router-dom";
import { UserStore } from "../../../store/user-store";
import { inject, observer } from "mobx-react";
import "./account-details.css";
import { Icon, Tab, Tabs } from "@blueprintjs/core";

interface Props {
  userStore: UserStore;
}

@inject("userStore")
@observer
export class AccountDetailsView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    if (this.props.userStore.user == undefined) {
      this.props.userStore.loadUserFromLocalStorage();
    }
  }

  render() {
    const { user } = this.props.userStore;
    return (
      <div>
        <Tabs id="accDetViewTabs" className="account-details-tabs">
          <Tab
            id="accDetViewTab"
            title="View Account Details"
            className="account-details-tab"
            panel={
              <React.Fragment>
                <span className="glyphicon glyphicon-user user-placeholder" />
                <div className="user-details">
                  <label>First Name:</label>
                  <span>{user.firstName}</span>
                  <br />
                  <label>Last Name:</label>
                  <span>{user.lastName}</span>
                  <br />
                  <label>Email:</label>
                  <span>{user.email}</span>
                  <br />
                  <label>Password:</label>
                  <Link to="/account/details/edit">Change password</Link>
                </div>
                <Link to="/account/details/edit">
                  <Icon icon="edit" className="edit-icon" />
                </Link>
              </React.Fragment>
            }
          />
        </Tabs>
      </div>
    );
  }
}
