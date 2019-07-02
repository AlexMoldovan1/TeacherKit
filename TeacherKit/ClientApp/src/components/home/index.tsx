import { Home } from "./Home";
import { Route } from "react-router-dom";
import * as React from "react";

export default () => {
  return (
    <div>
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Home} />
    </div>
  );
};
