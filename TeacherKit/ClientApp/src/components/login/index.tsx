import { Login } from "./Login";
import { Route } from "react-router-dom";
import * as React from "react";

export default () => {
  return (
    <div>
      <Route exact path="/user/login" component={Login} />
    </div>
  );
};
