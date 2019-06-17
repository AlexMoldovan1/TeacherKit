import { Route } from "react-router";
import * as React from "react";
import { StudentForm } from "./StudentForm";

export default () => {
  return (
    <React.Fragment>
      <Route path="/students/add" component={StudentForm} />
      <Route path="/students/edit/:id" component={StudentForm} />
    </React.Fragment>
  );
};
