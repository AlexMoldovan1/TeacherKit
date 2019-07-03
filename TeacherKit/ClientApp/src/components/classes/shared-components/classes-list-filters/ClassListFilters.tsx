import * as React from "react";
import { inject, observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import SearchInput from "src/shared/search-input/SearchInput";
import { ClassQueryViewModel } from "src/view-models/class";

interface Props {
  classes: ClassQueryViewModel[];
  handleClassesToOmit: Function;
}

interface State {
  classesIdOmitFilter: number[];
}

const initialState: State = {
  classesIdOmitFilter: []
};

@inject("studentsStore")
@observer
export class ClassListFilters extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private handleSearchKeyword(searchString: string) {
    this.searchThroughClasses(searchString);
  }

  private searchThroughClasses(name: string) {
    let classesIdOmitFilter: number[] = [];
    this.props.classes.forEach(classModel => {
      if (!classModel.title.toLowerCase().includes(name.toLowerCase())) {
        classesIdOmitFilter.push(classModel.id);
      }
    });
    this.setState({ classesIdOmitFilter: classesIdOmitFilter });
    this.props.handleClassesToOmit(classesIdOmitFilter);
  }

  render() {
    return (
      <React.Fragment>
        <div className="bp3-inline filter-fields">
          <SearchInput
            onSearch={this.handleSearchKeyword.bind(this)}
            searchWhileTyping={true}
            searchFieldPlaceholder="Search classes by title..."
          />
        </div>
      </React.Fragment>
    );
  }
}
