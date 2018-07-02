import * as React from "react";
import { Route } from "react-router-dom";

import { Guide } from "./components/Guide";
import { Welcome } from "./components/Welcome";

import "./css/App.css";

class App extends React.Component {

  public render() {
    return (
      <div className="app">
          <Route exact path="/" component={Welcome} />
          <Route path="/guide" component={Guide} />
      </div>
    );
  }
}

export default App;
