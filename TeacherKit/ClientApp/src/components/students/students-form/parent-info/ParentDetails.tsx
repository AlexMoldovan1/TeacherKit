import * as React from "react";
import "./parent-details.css";
import { StudentViewModel } from "../../../../view-models/student";
import { TextArea } from "@blueprintjs/core";

interface Props {
  student: StudentViewModel;
  handleParentDetailsFirstNameChange: Function;
  handleParentDetailsLastNameChange: Function;
  handleParentDetailsPhoneChange: Function;
  handleParentDetailsEmailChange: Function;
  handleParentDetailsAdressChange: Function;
  savePressed: boolean;
}
interface State {
  code: number;
  valueGender: string;
}

const initialState = {
  code: 0,
  valueGender: "female"
};

export class ParentDetails extends React.Component<Props, State> {
  private nameRef: any;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private handleParentDetailsFirstNameChange(event: any) {
    this.props.handleParentDetailsFirstNameChange(event.target.value);
  }

  private handleParentDetailsLastNameChange(event: any) {
    this.props.handleParentDetailsLastNameChange(event.target.value);
  }

  private handleParentDetailsPhoneChange(event: any) {
    this.props.handleParentDetailsPhoneChange(event.target.value);
  }

  private handleParentDetailsEmailChange(event: any) {
    this.props.handleParentDetailsEmailChange(event.target.value);
  }

  private handleParentDetailsAdressChange(event: any) {
    this.props.handleParentDetailsAdressChange(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="bp3-form-group bp3-inline parent-details">
          <label className="bp3-label">FirstName*</label>
          <input
            className="bp3-input parent valid"
            value={this.props.student.parentInfo.firstName}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleParentDetailsFirstNameChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline parent-details">
          <label className="bp3-label">LastName*</label>
          <input
            className="bp3-input parent valid"
            value={this.props.student.parentInfo.lastName}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleParentDetailsLastNameChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline parent-details">
          <label className="bp3-label">Phone*</label>
          <input
            className="bp3-input parent valid"
            value={this.props.student.parentInfo.phone}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleParentDetailsPhoneChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline parent-details">
          <label className="bp3-label">E-mail</label>
          <input
            className="bp3-input parent valid"
            value={this.props.student.parentInfo.email}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleParentDetailsEmailChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline parent-details">
          <label className="bp3-label">Adress*</label>
          <TextArea
            className="parent-adress valid"
            large={true}
            value={this.props.student.parentInfo.adress}
            onChange={this.handleParentDetailsAdressChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
