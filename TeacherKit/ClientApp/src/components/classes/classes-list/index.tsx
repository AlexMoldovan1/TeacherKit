import { Route } from "react-router";
import * as React from "react";
import { ClassesList } from "./ClassesList";

export default () => {
  return <Route path="/classes/all" component={ClassesList} />;
};
