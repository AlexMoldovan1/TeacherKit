import { Route } from "react-router";
import * as React from "react";
import { ClassesStar } from "./ClassesStar";

export default () => {
  return <Route path="/classes/stars" component={ClassesStar} />;
};
