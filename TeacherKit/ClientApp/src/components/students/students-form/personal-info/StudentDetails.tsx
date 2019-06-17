import * as React from "react";
import "./student-details.css";
import { StudentViewModel } from "../../../../view-models/student";
import { NumericInput, TextArea } from "@blueprintjs/core";

import { Radio, RadioGroup } from "@blueprintjs/core";
import { Example, handleStringChange } from "@blueprintjs/docs-theme";

interface Props {
  student: StudentViewModel;
  handleStudentDetailsFirstNameChange: Function;
  handleStudentDetailsLastNameChange: Function;
  handleStudentDetailsCodeChange: Function;
  handleStudentDetailsAgeChange: Function;
  handleStudentDetailsPhoneChange: Function;
  handleStudentDetailsEmailChange: Function;
  handleStudentDetailsAdressChange: Function;
  handleStudentDetailsGenderChange: Function;
  savePressed: boolean;
}
interface State {
  code: number;
  age: number;
  valueGender: string;
}

const initialState = {
  code: 0,
  age: 0,
  valueGender: "female"
};

export class StudentDetails extends React.Component<Props, State> {
  private nameRef: any;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps, prevState) {
    this.functie();
    // if (this.props.student.id && prevProps.student !== this.props.student) {
    //   this.changeValuesForEditedStudent();
    // }
  }

  componentWillpdate() {
    this.functie();
  }

  private functie(): void {
    if (this.props.savePressed && this.nameRef.value === "") {
      this.nameRef.classList.replace("valid", "invalid");
    } else {
      this.nameRef.classList.replace("invalid", "valid");
    }
  }

  // private changeValuesForEditedStudent() {
  //   this.setState({
  //     ...this.state,
  //     servingsInput: this.props.recipe.servings,
  //     prepTimeHour: this.getNumberOfHours(this.props.recipe.prepTime),
  //     prepTimeMinutes: this.getNumberOfMinutes(this.props.recipe.prepTime),
  //     cookTimeHour: this.getNumberOfHours(this.props.recipe.cookTime),
  //     cookTimeMinutes: this.getNumberOfMinutes(this.props.recipe.cookTime),
  //     sliderValue: this.getDifficultyValue(this.props.recipe.difficulty),
  //     rating: this.getRating(this.props.recipe.rating),
  //     listcheckboxes: this.getCategory(this.props.recipe.category)
  //   });
  // }

  private handleStudentDetailsFirstNameChange(event: any) {
    this.props.handleStudentDetailsFirstNameChange(event.target.value);
  }

  private handleStudentDetailsLastNameChange(event: any) {
    this.props.handleStudentDetailsLastNameChange(event.target.value);
  }

  private handleStudentDetailsCodeChange(value: any) {
    this.setState({ code: value });
    this.props.handleStudentDetailsCodeChange(value);
  }

  private handleStudentDetailsAgeChange(value: any) {
    this.setState({ age: value });
    this.props.handleStudentDetailsAgeChange(value);
  }

  private handleStudentDetailsPhoneChange(event: any) {
    this.props.handleStudentDetailsPhoneChange(event.target.value);
  }

  private handleStudentDetailsEmailChange(event: any) {
    this.props.handleStudentDetailsEmailChange(event.target.value);
  }

  private handleStudentDetailsAdressChange(event: any) {
    this.props.handleStudentDetailsAdressChange(event.target.value);
  }

  private handleStudentDetailsGenderChange(event: any) {
    this.setState({ ...this.state, valueGender: event.target.value });
    this.props.handleStudentDetailsGenderChange(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="bp3-form-group bp3-inline student-details">
          <label className="bp3-label">FirstName*</label>
          <input
            className="bp3-input student valid"
            value={this.props.student.firstName}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleStudentDetailsFirstNameChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline student-details">
          <label className="bp3-label">LastName*</label>
          <input
            className="bp3-input student valid"
            value={this.props.student.lastName}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleStudentDetailsLastNameChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline student-details">
          <label className="bp3-label">Code*</label>
          <NumericInput
            value={this.state.code}
            className="student-code"
            onValueChange={e => this.handleStudentDetailsCodeChange(e)}
          />
        </div>
        <div className="bp3-form-group bp3-inline student-details">
          <label className="bp3-label">Age*</label>
          <NumericInput
            value={this.state.age}
            className="student-code"
            onValueChange={e => this.handleStudentDetailsAgeChange(e)}
          />
        </div>
        <div className="bp3-form-group bp3-inline student-details">
          <label className="bp3-label">Phone</label>
          <input
            className="bp3-input student valid"
            value={this.props.student.phone}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleStudentDetailsPhoneChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline student-details">
          <label className="bp3-label">E-mail</label>
          <input
            className="bp3-input student valid"
            value={this.props.student.email}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleStudentDetailsEmailChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline student-details">
          <label className="bp3-label">Gender</label>
          <RadioGroup
            className="formGender"
            name="group"
            onChange={this.handleStudentDetailsGenderChange.bind(this)}
            selectedValue={this.state.valueGender}
          >
            <Radio
              label="Male"
              value="male"
              className="radio-button"
              checked={true}
            />
            <Radio label="Female" value="female" />
          </RadioGroup>
        </div>
        <div className="bp3-form-group bp3-inline student-details">
          <label className="bp3-label">Adress*</label>
          <TextArea
            className="student-adress valid"
            large={true}
            value={this.props.student.adress}
            onChange={this.handleStudentDetailsAdressChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
