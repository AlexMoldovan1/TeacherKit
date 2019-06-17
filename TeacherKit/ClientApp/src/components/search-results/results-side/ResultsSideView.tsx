import * as React from "react";
import "../search-input.css";
import "../../../shared/shared-css/list-all.css";
import { SearchResultItem } from "./SearchResultItem";
import { FilteredViewModel } from "../../../view-models/filteredModel";
import Spinner from "../../../shared/spinner/Spinner";

export interface Props {
  filteredList: FilteredViewModel[];
  waitingForData: boolean;
}

export interface State {}

export class ResultsSideView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="results-side scrollbarStyle">
        <Spinner waitingForData={this.props.waitingForData} />
        {this.props.filteredList.map((filteredList, index) => {
          return (
            <div key={index}>
              <SearchResultItem filteredList={filteredList} />
            </div>
          );
        })}
      </div>
    );
  }
}
