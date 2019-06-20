import * as React from "react";
import "./tab-menu.css";
import { observer } from "mobx-react";
import * as classNames from "classnames";
import { Link, Redirect } from "react-router-dom";
import { HeaderTabs } from "../../view-models/header-tabs";
import { ViewStore } from "../../store/view-store";
import { Icon } from "../../../node_modules/@blueprintjs/core/lib/esm/components";
import student from "../../shared/UtilsImages/student.svg";
import { studentsIcon } from "../../shared/convert-svg-in-icon/studentsIcon";
import { FilteredListStore } from "../../store/filtered-store";
import { SearchInput } from "../search-results/SearchInput";
import { FilteredType } from "src/view-models/filteredType";

interface Props {
  viewStore: ViewStore;
  filteredStore: FilteredListStore;
}

interface State {
  redirectTo: string;
}

@observer
class TabMenu extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { redirectTo: "" };
  }

  private changeActiveTab(tab: HeaderTabs) {
    this.setState({ redirectTo: "" });
    this.props.viewStore.changeActiveHeaderTab(tab);
  }

  isActive(tab: HeaderTabs) {
    return this.props.viewStore.activeHeaderTab === tab;
  }

  handleEnter(searchString: any) {
    this.changeActiveTab(HeaderTabs.search);
    if (searchString == "") searchString = encodeURI(" ");
    this.setState({ redirectTo: "/searchResults/" + searchString });
    this.props.filteredStore.loadFilteredList(searchString);
  }

  private handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  public render() {
    return (
      <div>
        {this.handleRedirect()}
        <div className="header-tabs">
          <ul className="tabs">
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.home)
              })}
            >
              <Link
                to="/home"
                onClick={() => this.changeActiveTab(HeaderTabs.home)}
              >
                <Icon className="icon-home" icon="home" />
                Home
              </Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.students)
              })}
            >
              <Link
                to="/students/all"
                onClick={() => this.changeActiveTab(HeaderTabs.students)}
              >
                <span className="icon-students">
                  <Icon icon={studentsIcon} />
                </span>
                Students
              </Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.classes)
              })}
            >
              <Link
                to="/classes/all"
                onClick={() => this.changeActiveTab(HeaderTabs.classes)}
              >
                <Icon className="icon-classes" icon="people" />
                Classes
              </Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.activities)
              })}
            >
              <Link
                to="/activities/add"
                onClick={() => this.changeActiveTab(HeaderTabs.activities)}
              >
                <Icon className="icon-calendar" icon="calendar" />
                Activities
              </Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.search)
              })}
            >
              <SearchInput onSearch={this.handleEnter.bind(this)} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TabMenu;
