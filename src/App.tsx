import * as React from "react";
import { Route } from "react-router-dom";

import Guide from "./components/Guide";
import Header from "./components/Header";
import Welcome from "./components/Welcome";

import "./css/App.css";

class App extends React.Component {

  public render() {
    return (
        <div className="app">
            <Header />
            <Route exact path="/" component={Welcome} />
            <Route path="/guide/:guideSlug" component={Guide} />
        </div>
    );
  }
}

export default App;
