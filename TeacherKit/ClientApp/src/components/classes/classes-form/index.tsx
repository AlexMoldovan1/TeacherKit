import { Route } from "react-router";
import * as React from "react";
import { ClassForm } from "./ClassForm";

export default () => {
  return (
    <React.Fragment>
      <Route path="/classes/add" component={ClassForm} />
      <Route path="/classes/edit/:id" component={ClassForm} />
      <Route path="/classes/addStudent/:id" component={ClassForm} />
    </React.Fragment>
  );
};
