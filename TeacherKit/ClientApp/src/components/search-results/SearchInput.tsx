import * as React from "react";
import "./search-input.css";

export interface Props {
  onSearch: (string) => void;
}

interface State {
  searchFieldPlaceholder: string;
  searchString: string;
}

const initialState: State = {
  searchFieldPlaceholder: "Search...",
  searchString: ""
};

export class SearchInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private handleKeyPressed(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      this.props.onSearch(this.state.searchString);
      this.setState({
        searchString: ""
      });
    }
  }

  private handleSearchStringChanged(event) {
    this.setState({
      searchString: event.target.value
    });
  }

  render(): React.ReactNode {
    return (
      <input
        type="text"
        placeholder={
          this.state.searchString || this.state.searchFieldPlaceholder
        }
        onChange={this.handleSearchStringChanged.bind(this)}
        className="search_keyword selects filter-common inputStyle"
        value={this.state.searchString}
        onKeyPress={this.handleKeyPressed.bind(this)}
      />
    );
  }
}
