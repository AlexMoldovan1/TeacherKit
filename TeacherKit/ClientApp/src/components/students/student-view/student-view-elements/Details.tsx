import * as React from "react";
import "../student-view.css";
import { Icon } from "../../../../../node_modules/@blueprintjs/core";
import { StudentQueryViewModel } from "../../../../view-models/student";

interface Props {
  activeStudent: StudentQueryViewModel;
}

export class Details extends React.Component<Props> {
  render() {
    return (
      <div className="column border-section-student student-details">
        <div className="bookmark-icon">
          <Icon color="#f25800" icon="bookmark" iconSize={50} />
        </div>
        <div className="row">
          <div className="column">
            <span className="section-title">Details</span>
          </div>
        </div>
        <div className="section-content">
          <div className="row">
            <div className="column">
              <span>Code: </span>
              {this.props.activeStudent.code}
            </div>
          </div>
          <div className="row">
            <div className="column">
              <span>Age: </span>
              {this.props.activeStudent.age}
            </div>
          </div>
          <div className="row">
            <div className="column">
              <span>Phone: </span>
              {this.props.activeStudent.phone}
            </div>
          </div>
          <div className="row">
            <div className="column">
              <span>E-mail: </span>
              {this.props.activeStudent.email}
            </div>
          </div>
          <div className="row">
            <div className="column">
              <span>Adress: </span>
              {this.props.activeStudent.adress}
            </div>
          </div>
          <div className="row">
            <div className="column">
              <span>Gender: </span>
              {this.props.activeStudent.gender}
            </div>
          </div>
          <div className="row second-section">
            <div className="column">
              <span className="section-title">Parent Informations</span>
            </div>
          </div>
          <div className="section-content">
            <div className="row">
              <div className="column">
                <span>Name: </span>
                {this.props.activeStudent.parentInfo.lastName +
                  " " +
                  this.props.activeStudent.parentInfo.firstName}
              </div>
            </div>
            <div className="row">
              <div className="column">
                <span>E-mail: </span>
                {this.props.activeStudent.parentInfo.email}
              </div>
            </div>
            <div className="row">
              <div className="column">
                <span>Phone: </span>
                {this.props.activeStudent.parentInfo.phone}
              </div>
            </div>
            <div className="row">
              <div className="column">
                <span>Adress: </span>
                {this.props.activeStudent.parentInfo.adress}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
