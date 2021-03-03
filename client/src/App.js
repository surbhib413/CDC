import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MouLanding from "./pages/MouLanding/MouLanding";
import RefinaryLanding from "./pages/RefinaryLanding/RefinaryLanding";
import ITRMLanding from "./pages/ItrmLanding/ItrmLanding";
import BuLanding from "./pages/BuLanding/BuLanding";
import OrgLanding from "./pages/OrgLanding/OrgLanding";

function App() {
  return (
    <Router>
      <Switch>

        <Route path='/mou'>
          <MouLanding />
        </Route>

        <Route path='/refinery'>
          <RefinaryLanding />
        </Route>

        <Route path='/itrm'>
          <ITRMLanding />
        </Route>

        <Route path='/bu'>
          <BuLanding />
        </Route>
        <Route path='/org'>
          <OrgLanding />
        </Route>
        <Route path='/'>
          <MouLanding />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
