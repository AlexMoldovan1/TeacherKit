import * as React from "react";
import * as classNames from "classnames";
import { Link } from "react-router-dom";
import "./students-tab-menu.css";
import { observer, inject } from "mobx-react";
import { ViewStore } from "../../../store/view-store";
import { HeaderTabs } from "../../../view-models/header-tabs";
import { StudentsTabs } from "../../../view-models/students-tabs";

interface Props {
  viewStore: ViewStore;
}

@inject("viewStore")
@observer
export default class StudentsTabMenu extends React.Component<Props> {
  componentWillMount() {
    this.props.viewStore.changeActiveHeaderTab(HeaderTabs.students);
  }

  isActive(tab: StudentsTabs) {
    return this.props.viewStore.activeStudentsTab === tab;
  }

  public render() {
    return (
      <div>
        <div className="header-tabs">
          <ul className="student-tab-menu tabs">
            <li
              className={classNames({
                active: this.isActive(StudentsTabs.stars),
                "stars-tab": true,
                "student-tab-menu": true
              })}
            >
              <Link to="/students/stars">Stars students</Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(StudentsTabs.add),
                "add-student-tab": true,
                "student-tab-menu": true
              })}
            >
              <Link to="/students/add">Add</Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(StudentsTabs.all),
                "all-student-tab": true,
                "student-tab-menu": true
              })}
            >
              <Link to="/students/all">All</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
