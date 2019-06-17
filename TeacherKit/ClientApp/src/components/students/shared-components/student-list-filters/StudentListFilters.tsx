import * as React from "react";
import { inject, observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import SearchInput from "src/shared/search-input/SearchInput";
import { StudentViewModel } from "src/view-models/student";

interface Props {
  students: StudentViewModel[];
  handleStudentsToOmit: Function;
  handleFilterByGender: Function;
}

interface State {
  studentsIdOmitFilter: number[];
}

const initialState: State = {
  studentsIdOmitFilter: []
};

@inject("studentsStore")
@observer
export class StudentListFilters extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private handleFilterByGender(e: any) {
    this.props.handleFilterByGender(e.target.value);
  }

  private handleSearchKeyword(searchString: string) {
    this.searchThroughStudents(searchString);
  }

  private searchThroughStudents(name: string) {
    let studentsIdOmitFilter: number[] = [];
    this.props.students.forEach(student => {
      if (
        !(student.firstName + " " + student.lastName)
          .toLowerCase()
          .includes(name.toLowerCase())
      ) {
        studentsIdOmitFilter.push(student.id);
      }
    });
    this.setState({ studentsIdOmitFilter: studentsIdOmitFilter });
    this.props.handleStudentsToOmit(studentsIdOmitFilter);
  }

  render() {
    return (
      <React.Fragment>
        <div className="bp3-inline filter-fields">
          <SearchInput
            onSearch={this.handleSearchKeyword.bind(this)}
            searchWhileTyping={true}
          />
          <select
            className="select_search filter-common"
            onChange={this.handleFilterByGender.bind(this)}
          >
            <option value="" selected disabled hidden>
              Gender
            </option>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </React.Fragment>
    );
  }
}
