import { Route } from "react-router";
import * as React from "react";
import StudentsTabMenu from "./StudentsTabMenu";

export default () => {
  return <Route path="/students" component={StudentsTabMenu} />;
};
