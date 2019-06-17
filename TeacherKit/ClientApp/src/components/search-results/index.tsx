import { Route } from "react-router";
import * as React from "react";
import { SearchResults } from "./SearchResults";

export default () => {
  return <Route path="/searchResults/:keyword" component={SearchResults} />;
};
