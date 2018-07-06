import * as React from "react";
import { Route } from "react-router-dom";
import * as ReactGA from "react-ga";

import Guide from "./components/Guide";
import Welcome from "./components/Welcome";

import "./css/App.css";

ReactGA.initialize("UA-121924288-1");

const Analytics = () => {
    ReactGA.pageview(window.location.pathname);
    return null;
}

class App extends React.Component {

  public render() {
    return (
        <div className="app">
            <Route pattern="/" component={Analytics} />
            <Route exact path="/" component={Welcome} />
            <Route path="/guide/:guideSlug" component={Guide} />
        </div>
    );
  }
}

export default App;
