import * as React from "react";
import { Route, Switch } from "react-router-dom";
import * as ReactGA from "react-ga";

import Guide from "./components/Guide";
import Welcome from "./components/Welcome";
import Error404 from "./components/Error404";

import "./css/App.css";

ReactGA.initialize("UA-121924288-1");

const Analytics = () => {
    if (process.env.NODE_ENV === "production") {
        ReactGA.pageview(window.location.pathname);
    }
    return null;
}

class App extends React.Component {

  public render() {
    return (
        <div className="app">
            <Route pattern="/" component={Analytics} />
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/guide/:guideSlug" component={Guide} />
                <Route component={Error404} />
            </Switch>
        </div>
    );
  }
}

export default App;
