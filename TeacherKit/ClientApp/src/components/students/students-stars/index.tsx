import { Route } from "react-router";
import * as React from "react";
import { StudentsStars } from "./StudentsStars";

export default () => {
  return <Route path="/students/stars" component={StudentsStars} />;
};
