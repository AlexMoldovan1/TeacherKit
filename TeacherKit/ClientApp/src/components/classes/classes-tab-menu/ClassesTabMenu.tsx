import * as React from "react";
import * as classNames from "classnames";
import { Link } from "react-router-dom";
import "./classes-tab-menu.css";
import { observer, inject } from "mobx-react";
import { ViewStore } from "../../../store/view-store";
import { HeaderTabs } from "../../../view-models/header-tabs";
import { ClassesTabs } from "../../../view-models/classes-tabs";

interface Props {
  viewStore: ViewStore;
}

@inject("viewStore")
@observer
export default class TabMenu extends React.Component<Props> {
  componentWillMount() {
    this.props.viewStore.changeActiveHeaderTab(HeaderTabs.classes);
  }

  isActive(tab: ClassesTabs) {
    return this.props.viewStore.activeClassesTab === tab;
  }

  public render() {
    return (
      <div>
        <div className="header-tabs">
          <ul className="class-tab-menu tabs">
            <li
              className={classNames({
                active: this.isActive(ClassesTabs.stars),
                "stars-tab": true,
                "class-tab-menu": true
              })}
            >
              <Link to="/classes/stars">Star classes</Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(ClassesTabs.add),
                "add-class-tab": true,
                "class-tab-menu": true
              })}
            >
              <Link to="/classes/add">Add</Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(ClassesTabs.all),
                "all-class-tab": true,
                "class-tab-menu": true
              })}
            >
              <Link to="/classes/all">All</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
