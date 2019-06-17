import { Route } from "react-router";
import * as React from "react";
import { AccountDetailsView } from "./AccountDetailsView";

export default () => {
  return <Route path="/account/details/view" component={AccountDetailsView} />;
};
