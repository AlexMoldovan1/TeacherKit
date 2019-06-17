import { Route } from "react-router";
import * as React from "react";
import { AccountDetailsEdit } from "./AccountDetailsEdit";

export default () => {
  return <Route path="/account/details/edit" component={AccountDetailsEdit} />;
};
