import { Route } from "react-router-dom";
import * as React from "react";
import TabMenu from "./TabMenu";

export default () => {
  return (
    <div>
      <Route exact path="/home" component={TabMenu} />
    </div>
  );
};
