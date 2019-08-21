import React from "react";
import { Switch, Route } from "react-router-dom";
import Inventory from "./components/Inventory";

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Inventory} />
    </Switch>
  </main>
);

export default App;
