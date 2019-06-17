import { Route } from "react-router";
import * as React from "react";
import { StudentsList } from "./StudentsList";

export default () => {
  return <Route path="/students/all" component={StudentsList} />;
};
