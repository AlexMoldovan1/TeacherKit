import { Route } from "react-router";
import * as React from "react";
import { ClassView } from "./ClassView";

export default () => {
  return (
    <React.Fragment>
      <Route path="/class/:id" component={ClassView} />
    </React.Fragment>
  );
};
