import { Route } from "react-router";
import * as React from "react";
import { StudentView } from "./StudentView";

export default () => {
  return (
    <React.Fragment>
      <Route path="/student/:id" component={StudentView} />
    </React.Fragment>
  );
};
