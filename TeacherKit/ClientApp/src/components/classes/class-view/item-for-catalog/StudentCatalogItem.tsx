import * as React from "react";
import { observer } from "mobx-react";
import "./student-catalog-item.css";
import { Redirect } from "react-router-dom";
import {
  StudentQueryViewModel,
  StudentViewModel
} from "../../../../view-models/student";
import MyIcon from "../../../../shared/student-icon/MyIcon";
import IconClassesElements from "../class-view-elements/IconClassesElements";

interface Props {
  student: StudentQueryViewModel;
}

interface State {
  redirectTo: string;
}

@observer
export class StudentCatalogItem extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirectTo: ""
    };
  }

  handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  handleClick(student: StudentQueryViewModel) {
    this.setState({ redirectTo: "/student/" + student.id });
  }

  handleHaveImage(): string {
    let src: string = "";
    if (this.props.student.studentsMedia.length > 0) {
      for (let i = 0; i < this.props.student.studentsMedia.length; i++) {
        let extension = this.props.student.studentsMedia[i].imageName
          .split(".")
          .pop();
        if (extension === "mp4") src = "";
        else {
          src = "/Images/" + this.props.student.studentsMedia[i].imageName;
          break;
        }
      }
    }
    return src;
  }

  render() {
    return (
      this.handleRedirect() || (
        <div className="list-catalog-item">
          <div onClick={() => this.handleClick(this.props.student)}>
            <IconClassesElements
              src={this.handleHaveImage()}
              className="list-item-catalog-photo"
            />
          </div>
          <div
            className="summary_field"
            onClick={() => this.handleClick(this.props.student)}
          >
            {this.props.student.lastName + " " + this.props.student.firstName}
          </div>
        </div>
      )
    );
  }
}
