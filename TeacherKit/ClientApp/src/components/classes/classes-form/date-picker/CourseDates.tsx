import * as React from "react";
import "./date-picker.css";
import { ClassViewModel } from "../../../../view-models/class";
import { CourseDatePicker } from "../date-picker/DatePicker";
import { MomentDateRange } from "../date-picker/MomentData";

const FORMAT = "DD/MM/YYYY";

interface Props {
  classModel: ClassViewModel;
  handleCourseStartChange: Function;
  handleCourseEndChange: Function;
}

interface State {
  courseStartDate: Date;
  courseEndDate: Date;
}

const initialState = {
  courseStartDate: new Date(),
  courseEndDate: new Date()
};

export class CourseDates extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.classModel.id &&
      previousProps.classModel !== this.props.classModel
    ) {
      this.changeValuesForEditedClass();
    }
  }

  private changeValuesForEditedClass() {
    this.setState({
      courseStartDate: this.props.classModel.courseStartDate,
      courseEndDate: this.props.classModel.courseEndDate
    });
  }

  private handleStartDateChange(startDate: Date) {
    this.setState({
      courseStartDate: startDate
    });
    this.props.handleCourseStartChange(startDate);
  }

  private handleEndDateChange(endDate: Date) {
    this.setState({
      courseEndDate: endDate
    });
    this.props.handleCourseEndChange(endDate);
  }

  render() {
    return (
      <div>
        <div className="bp3-form-group bp3-inline">
          <label className="bp3-label course-date-label">
            Course start date to end date*
          </label>
          <CourseDatePicker
            handleStartDateChange={this.handleStartDateChange.bind(this)}
            handleEndDateChange={this.handleEndDateChange.bind(this)}
          />
        </div>
        <MomentDateRange
          range={[this.state.courseStartDate, this.state.courseEndDate]}
          withTime={false}
          format={FORMAT}
        />
      </div>
    );
  }
}
