import * as React from "react";
import "./App.css";
import Welcome from "./components/welcome/Welcome";
import { Provider } from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";
import rootStore from "./store/root-store";
import { UserViewModel } from "./view-models/user";
import TabMenu from "./components/tab-menu/TabMenu";
import StudentsTabMenuRoute from "./components/students/students-tab-menu";
import StudentsRoute from "./components/students/students-list";
import StudentFormRoute from "./components/students/students-form";
import LoginRoute from "./components/login";
import RegisterRoute from "./components/register";
import Unauthorized from "./components/unauthorized/Unauthorized";
import DevTools from "mobx-react-devtools";
import AccountDetailsViewRoute from "./components/welcome/account-details";
import AccountDetailsEditRoute from "./components/welcome/account-details-edit";
import SearchTabRoute from "./components/search-results";
import StudentStarsRoute from "./components/students/students-stars";
import SingleStudentRoute from "./components/students/student-view";
import ClassesTabMenuRoute from "./components/classes/classes-tab-menu";
import ClassesRoute from "./components/classes/classes-list";
import ClassesFormRoute from "./components/classes/classes-form";

interface State {
  logged: any;
  clickLogged: boolean;
  registered: boolean;
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { logged: "", clickLogged: false, registered: false };
  }

  private updateState(): void {
    if (localStorage.getItem("logged") === null) {
      localStorage.setItem("logged", "");
      localStorage.setItem("user", "");
    }

    if (this.state.logged !== localStorage.getItem("logged")) {
      this.setState({
        logged: localStorage.getItem("logged")
      });
    }
  }

  private handleClickLogged(): void {
    this.setState({ clickLogged: !this.state.clickLogged });
  }

  private renderWelcomeUser(): string {
    var userJson = localStorage.getItem("user");
    if (userJson !== null) {
      var user: any = JSON.parse(userJson);
    }
    const currentUser = new UserViewModel(
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.tokenGuid
    );
    return "Hello " + currentUser.firstName + " " + currentUser.lastName;
  }

  componentDidMount() {
    this.updateState();
  }

  updateRegister(register: any) {
    this.setState({ registered: register });
  }

  public render() {
    return (
      <div className="App">
        <Provider {...rootStore}>
          <React.Fragment>
            <Router>
              <React.Fragment>
                {this.state.logged != "" ? (
                  <React.Fragment>
                    <div className="topSide">
                      <header className="App-header-after-login">
                        {/* <label className="myFont">My Classes</label> */}
                        <Welcome
                          renderWelcomeUser={this.renderWelcomeUser.bind(this)}
                          updateState={this.updateState.bind(this)}
                          userStore={rootStore.userStore}
                        />
                      </header>
                    </div>
                    <TabMenu
                      viewStore={rootStore.viewStore}
                      filteredStore={rootStore.filteredStore}
                    />
                    <StudentsTabMenuRoute />
                    <StudentsRoute />
                    <StudentFormRoute />
                    <AccountDetailsViewRoute />
                    <AccountDetailsEditRoute />
                    <SearchTabRoute />
                    <StudentStarsRoute />
                    <SingleStudentRoute />
                    <ClassesTabMenuRoute />
                    <ClassesRoute />
                    <ClassesFormRoute />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {!this.state.clickLogged ? (
                      <React.Fragment>
                        <Unauthorized
                          registered={this.state.registered}
                          handleClickLogged={this.handleClickLogged.bind(this)}
                          updateState={this.updateState.bind(this)}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <header className="App-header-before-login">
                          My Classes
                        </header>
                        <LoginRoute />
                        <RegisterRoute />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            </Router>
          </React.Fragment>
        </Provider>
        <DevTools />
      </div>
    );
  }
}
export default App;
