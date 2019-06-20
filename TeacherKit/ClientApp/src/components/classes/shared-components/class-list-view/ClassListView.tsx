import * as React from "react";
import { observer } from "mobx-react";
import "../../../../shared/shared-css/list-all.css";
import { ClassQueryViewModel } from "../../../../view-models/class";
import { ClassListItem } from "../class-list-item/ClassListItem";
import Spinner from "../../../../shared/spinner/Spinner";

interface Props {
  classes: ClassQueryViewModel[];
  waitingForData: boolean;
  classesToOmit: number[];
  handleSetStars: Function;
}

@observer
export class ClassListView extends React.Component<Props> {
  private classShouldBeOmittedAtRender(classModel) {
    return this.props.classesToOmit.find(id => classModel.id === id);
  }

  render() {
    return (
      <React.Fragment>
        <div className="list-items">
          <Spinner waitingForData={this.props.waitingForData} />
          {this.props.classes
            .filter(
              classModel => !this.classShouldBeOmittedAtRender(classModel)
            )
            .map((classModel, index) => {
              return (
                <div key={index}>
                  <ClassListItem
                    class={classModel}
                    handleSetStars={this.props.handleSetStars}
                    waitingForData={this.props.waitingForData}
                  />
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
