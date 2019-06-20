import { Classes, Icon } from "@blueprintjs/core";
import * as React from "react";
import "./date-picker.css";
import { DatePicker } from "@blueprintjs/datetime";

interface Props {
  handleStartDateChange: Function;
  handleEndDateChange: Function;
}

export class CourseDatePicker extends React.PureComponent<Props> {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };

  private handleStartDateChange(date: Date) {
    this.setState({ date: date });
    this.props.handleStartDateChange(date);
  }

  private handleEndDateChange(date: Date) {
    this.setState({ date: date });
    this.props.handleEndDateChange(date);
  }

  public render() {
    return (
      <React.Fragment>
        <div className="start-date-picker">
          <DatePicker
            maxDate={new Date("2025/01/01")}
            minDate={new Date("2018/01/01")}
            className={Classes.ELEVATION_1}
            onChange={newDate => this.handleStartDateChange(newDate)}
          />
        </div>
        <Icon icon="arrow-right" className="arrow-right-calendars" />
        <div className="end-date-picker">
          <DatePicker
            maxDate={new Date("2025/01/01")}
            minDate={new Date("2018/01/01")}
            className={Classes.ELEVATION_1}
            onChange={newDate => this.handleEndDateChange(newDate)}
          />
        </div>
      </React.Fragment>
    );
  }
}
