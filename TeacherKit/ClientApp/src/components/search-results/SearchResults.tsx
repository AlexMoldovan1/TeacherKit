import * as React from "react";
import { FiltersSideView } from "./filter-side/filter-side";
import { ResultsSideView } from "./results-side/ResultsSideView";
import "./search-input.css";
import { inject, observer } from "mobx-react";
import { FilteredListStore } from "../../store/filtered-store";
import { FilteredViewModel } from "../../view-models/filteredModel";

interface Match {
  params: {
    keyword: string;
  };
}

interface Props {
  match: Match;
  filteredStore: FilteredListStore;
}

interface State {
  filterOption: {
    optionsCheckBox: boolean[];
  };
}

const initialState: State = {
  filterOption: {
    optionsCheckBox: [false, true, true]
  }
};

interface CategorySelected {
  value: string;
  label: string;
}

@inject("filteredStore")
@observer
export class SearchResults extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
    this.props.filteredStore.loadFilteredList(this.props.match.params.keyword);
  }

  handleChangeFilter(options: boolean[]) {
    this.setState({
      filterOption: {
        optionsCheckBox: options
      }
    });
  }

  private filterByCheckBoxes(filteredLists: any): FilteredViewModel[] {
    let resultFilter: FilteredViewModel[] = [];

    this.state.filterOption.optionsCheckBox.forEach(
      (checked_students_or_classes, index) => {
        if (checked_students_or_classes && index == 0) {
          filteredLists = filteredLists.filter(elem => elem.star);
          return;
        }
        if (checked_students_or_classes)
          resultFilter = resultFilter.concat(
            filteredLists.filter(filteredList => filteredList.type == index - 1)
          );
      }
    );
    return resultFilter;
  }

  getFilteredItems(): FilteredViewModel[] {
    let result = this.props.filteredStore.filteredListModels;
    result = this.filterByCheckBoxes(result);
    return result.sort(
      (a, b) =>
        (a.firstName.length + a.lastName.length) <<
        (b.firstName.length + b.lastName.length)
    );
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <h1 className="headerStyle">
          Search Results for "{this.props.match.params.keyword}"
        </h1>
        <div className="search-results">
          <FiltersSideView
            handleChangeFilter={this.handleChangeFilter.bind(this)}
          />
          <ResultsSideView
            waitingForData={!this.props.filteredStore.dataWasReceived}
            filteredList={this.getFilteredItems.bind(this)()}
          />
        </div>
      </React.Fragment>
    );
  }
}
