import * as React from "react";
import { Checkbox } from "@blueprintjs/core";
import "../search-input.css";
import { Filter } from "../filter-side/filter-booleans";

export interface Props {
  handleChangeFilter: Function;
}

export interface State {
  isEnabled: boolean[];
  selectedOption: any;
}

const initialState: State = {
  isEnabled: [false, true, true],
  selectedOption: null
};

export class FiltersSideView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private handleEnabledChange = index => {
    let isEnabled = this.state.isEnabled;
    isEnabled[index] = !isEnabled[index];
    this.setState({ isEnabled: isEnabled });
    this.props.handleChangeFilter(isEnabled);
  };

  render() {
    return (
      <div className="filterSide">
        <Checkbox
          className="checkbox"
          checked={this.state.isEnabled[Filter.OnlyStar]}
          label="Only star items"
          large={true}
          onChange={() => this.handleEnabledChange(Filter.OnlyStar)}
        />
        <Checkbox
          className="checkbox"
          checked={this.state.isEnabled[Filter.Students]}
          label="Students"
          large={true}
          onChange={() => this.handleEnabledChange(Filter.Students)}
        />
        <Checkbox
          className="checkbox"
          checked={this.state.isEnabled[Filter.Classes]}
          label="Classes"
          large={true}
          onChange={() => this.handleEnabledChange(Filter.Classes)}
        />
      </div>
    );
  }
}
