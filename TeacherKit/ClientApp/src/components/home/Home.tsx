import * as React from "react";
import { inject, observer } from "mobx-react";
import { ViewStore } from "../../store/view-store";
import { UserStore } from "../../store/user-store";
import { Button } from "@blueprintjs/core";
import BackgroundImage from "../../loginBackground.jpg";
import students from "../../shared/UtilsImages/students.png";
import "./home.css";

interface Props {
  userStore: UserStore;
  viewStore: ViewStore;
}

@inject("viewStore")
@inject("userStore")
@observer
export class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleNewStudent() {
    window.location.href = "/students/add";
  }

  private handleNewClass() {
    window.location.href = "/classes/add";
  }

  private handleAllStudents() {
    window.location.href = "/students/all";
  }

  private handleAllClasses() {
    window.location.href = "/classes/all";
  }

  render() {
    return (
      <div className="container">
        <img
          className="background-home-image"
          src={BackgroundImage}
          alt="no img"
        />
        <img style={{ width: 250, height: 250 }} src={students} alt="no img" />
        <div className="div-for-svg">
          <p>
            <Button
              onClick={this.handleNewStudent.bind(this)}
              icon="new-person"
              className="home-buttons"
              text="Add Student"
            />
          </p>
          <p className="p-for-buttons">
            <Button
              onClick={this.handleNewClass.bind(this)}
              icon="add-to-artifact"
              className="home-buttons"
              text="Add class"
            />
          </p>
          <p className="p-for-buttons">
            <Button
              onClick={this.handleAllStudents.bind(this)}
              icon="person"
              className="home-buttons"
              text="All students"
            />
          </p>
          <p className="p-for-buttons">
            <Button
              onClick={this.handleAllClasses.bind(this)}
              icon="people"
              className="home-buttons"
              text="All classes"
            />
          </p>
        </div>
      </div>
    );
  }
}
