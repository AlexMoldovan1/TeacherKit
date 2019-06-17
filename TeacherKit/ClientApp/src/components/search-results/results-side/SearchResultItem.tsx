import * as React from "react";
import MyIcon from "../../../shared/student-icon/MyIcon";
import { FilteredViewModel } from "../../../view-models/filteredModel";
import { FilteredType } from "../../../view-models/filteredType";
import "../search-input.css";

export interface Props {
  filteredList: FilteredViewModel;
}

export interface State {}

export class SearchResultItem extends React.Component<Props, State> {
  render() {
    return (
      <div
        className="result-item"
        style={
          this.props.filteredList.type == FilteredType.Student
            ? { backgroundColor: "#dfedd6" }
            : { backgroundColor: "#C9F1FD" }
        }
      >
        <MyIcon src={this.props.filteredList.iconName} className="item-icon" />
        <span className="title-item">
          {this.props.filteredList.lastName +
            " " +
            this.props.filteredList.firstName}
        </span>
        {this.props.filteredList.star ? (
          <img className="icon-star-search" src="/UtilsImages/star.png" />
        ) : null}
      </div>
    );
  }
}
