import React from "react";
import { Switch, Route } from "react-router-dom";
import TimerPage from "../containers/TimerPage";
import RSVP from "../containers/RSVP";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <TimerPage />
        </Route>
        <Route exact path="/rsvp">
          <RSVP />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
