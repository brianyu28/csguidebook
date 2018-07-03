import * as React from "react";
import { Link } from "react-router-dom";

export default class Welcome extends React.Component {

  public render() {
    return (
        <div className="homepage-header">
            <img id="homepage-logo" src="/assets/img/logo.png" />
            <h1>CS Guidebook</h1>
            By Brian Yu
            <br/><br/>
            <Link to="/guide/git">Git</Link>
        </div>
    );
  }
}
