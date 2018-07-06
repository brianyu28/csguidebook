import * as React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

export default class Welcome extends React.Component {

  public render() {
    return (
        <div className="homepage-header">
            <Header />
            <img id="homepage-logo" src="/assets/img/logo.png" />
            <h1>CS Guidebook</h1>
            Learn about...
            <br/><br/>
            <Link to="/guide/git">Git</Link>
            <br/><br/>
            <hr/>
            <br/>
            CS Guidebook is a work in progress by <a href="https://www.brianyu.me" target="_blank">Brian Yu</a>.
        </div>
    );
  }
}
