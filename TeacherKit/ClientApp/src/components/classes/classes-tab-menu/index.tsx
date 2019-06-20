import { Route } from "react-router";
import * as React from "react";
import ClassesTabMenu from "./ClassesTabMenu";

export default () => {
  return <Route path="/classes" component={ClassesTabMenu} />;
};
