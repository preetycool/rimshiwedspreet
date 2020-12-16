import React from "react";
import { Switch, Route } from "react-router-dom";
import DetailsPage from "../containers/DetailsPage";
import RSVP from "../containers/RSVP";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <DetailsPage />
        </Route>
        <Route exact path="/rsvp">
          <RSVP />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
