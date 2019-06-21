import * as React from "react";
import { observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import "./student-catalog-item.css";
import { Redirect } from "react-router-dom";
import { StudentQueryViewModel } from "../../../../view-models/student";
import MyIcon from "../../../../shared/student-icon/MyIcon";
import { debug } from "util";

interface Props {
  student: StudentQueryViewModel;
  waitingForData: boolean;
}

interface State {
  redirectTo: string;
  rating: number;
  isOpenStarModal: boolean;
  isOpenAddToClassModal: boolean;
}

@observer
export class StudentCatalogItem extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirectTo: "",
      rating: 0,
      isOpenStarModal: false,
      isOpenAddToClassModal: false
    };
  }

  handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  handleClick(student: StudentQueryViewModel) {
    this.setState({ redirectTo: "/student/" + student.id });
  }

  render() {
    return (
      this.handleRedirect() || (
        <div className="list-item">
          <div onClick={() => this.handleClick(this.props.student)}>
            <MyIcon
              src={"/Images/" + this.props.student.studentsMedia[0].imageName}
              className="list-item-photo"
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
