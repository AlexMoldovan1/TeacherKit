import * as React from "react";
import "./class-details.css";
import { ClassViewModel } from "../../../../view-models/class";
import { TextArea, NumericInput } from "@blueprintjs/core";

interface Props {
  classModel: ClassViewModel;
  handleTitleChange: Function;
  handleCodeChange: Function;
  handleGroups: Function;
  handleUploadIcon: Function;
}

interface State {
  title: string;
  code: number;
  groups: string[];
  uploadedIcon: string | null;
}

const initialState = {
  title: "",
  code: 0,
  groups: [],
  uploadedIcon: ""
};

export class ClassDetails extends React.Component<Props, State> {
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
      title: this.props.classModel.title,
      code: this.props.classModel.code,
      uploadedIcon: this.props.classModel.classIconModel.imageName,
      groups: this.props.classModel.groups.map(group => group.content)
    });
  }

  private handleTitleChange(event: any) {
    this.props.handleTitleChange(event.target.value);
  }

  private handleCodeChange(value: any) {
    this.props.handleCodeChange(value);
  }

  onKeyUp(event: any) {
    if (event.key == "Enter") {
      event.preventDefault();
    }
    if (event.which === 32 || event.key == "Enter") {
      let input = event.target.value;
      const groupsAux = [...this.state.groups];
      this.addGroup(input, groupsAux);
      this.clearInputGroup(event);
    }
  }

  private addGroup(input, groupsAux) {
    const x = groupsAux.filter(group => group === input);
    if (x.length === 0) {
      const groups = [...this.state.groups, input];
      this.setState({
        groups: groups
      });
      this.handleGroups(groups);
    }
  }

  private clearInputGroup(event: any) {
    event.target.value = "";
  }

  onDeleteGroup = (group: any) => {
    let groups = this.state.groups.filter(gr => {
      return gr !== group;
    });

    this.setState({
      groups: groups
    });
  };

  private handleGroups = (groups: string[]) => {
    this.props.handleGroups(groups);
  };

  private getGroups() {
    return this.state.groups.map((group, key) => {
      return (
        <li
          key={key}
          className="groupStyle"
          onClick={() => this.onDeleteGroup(group)}
        >
          {group} &#x2716;
        </li>
      );
    });
  }

  private handleUploadIcon(event: any): void {
    const photoToUpload = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.props.handleUploadIcon(photoToUpload);
      this.setState({ uploadedIcon: String(reader.result) });
    };
    reader.readAsDataURL(photoToUpload);
  }

  render() {
    let groups = this.getGroups();
    const disableGroups = groups.length >= 10;

    return (
      <div>
        <div className="bp3-form-group bp3-inline class-details">
          <label className="bp3-label">Title*</label>
          <input
            className="bp3-input class-width-inputs"
            value={this.props.classModel.title}
            placeholder="Title"
            onChange={this.handleTitleChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline class-details">
          <label className="bp3-label">Code*</label>
          <NumericInput
            value={this.props.classModel.code}
            className="class-code"
            onValueChange={e => this.handleCodeChange(e)}
          />
        </div>
        <div className="bp3-form-group bp3-inline class-details">
          <label className="bp3-label">Groups</label>
          <div className="cStyle">
            <div>
              {groups}
              <input
                disabled={disableGroups}
                className="bp3-input iStyle class-width-inputs"
                onKeyPress={this.onKeyUp.bind(this)}
                placeholder="Enter and Space!"
              />
            </div>
          </div>
        </div>
        <div className="bp3-form-group bp3-inline">
          <label className="bp3-label">Icon Class**</label>
          <div className="class-file-upload">
            <div />
            <input
              type="button"
              value="Attach photo"
              className="class-file-upload"
            />
            <input
              type="file"
              name="files"
              id="class"
              accept="image/jpg,image/png,image/jpeg"
              className="class-file-upload"
              onChange={this.handleUploadIcon.bind(this)}
            />
          </div>
        </div>
        {this.state.uploadedIcon && (
          <div className="divForMediaClass">
            <img
              className="imageUploadForClass"
              src={this.state.uploadedIcon}
            />
          </div>
        )}
      </div>
    );
  }
}
