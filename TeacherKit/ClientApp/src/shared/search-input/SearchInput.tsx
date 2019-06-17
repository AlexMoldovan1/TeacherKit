import * as React from "react";
import "./search-input.css";

interface Props {
  searchFieldPlaceholder?: string;
  searchBtnContent?: any;
  searchWhileTyping?: boolean;
  onSearch: (string) => void;
}

interface State {
  searchFieldPlaceholder: string;
  searchString: string;
}

const initialState: State = {
  searchFieldPlaceholder: "Search students by name...",
  searchString: ""
};

export class SearchInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private handleSearchStringChanged(event) {
    this.setState({ searchString: event.target.value }, () => {
      if (this.props.searchWhileTyping) {
        this.handleSearchBtnClicked();
      }
    });
  }

  private handleKeyPressed(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      this.handleSearchBtnClicked();
    }
  }

  private handleSearchBtnClicked() {
    this.props.onSearch(this.state.searchString);
  }

  render() {
    return (
      <div className="search-input">
        <input
          type="text"
          placeholder={
            this.props.searchFieldPlaceholder ||
            this.state.searchFieldPlaceholder
          }
          className="bp3-input search-field"
          value={this.state.searchString}
          onChange={this.handleSearchStringChanged.bind(this)}
          onKeyPress={this.handleKeyPressed.bind(this)}
        />
      </div>
    );
  }
}

export default SearchInput;
