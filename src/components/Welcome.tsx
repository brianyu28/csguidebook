import * as React from "react";
import { Link } from "react-router-dom";

export class Welcome extends React.Component {

  public render() {
    return (
        <div className="header">
            <img id="logo" src="/assets/img/logo.png" />
            <h1>CS Guidebook</h1>
            By Brian Yu
            <br/><br/>
            <Link to="/guide">Start Learning</Link>
        </div>
    );
  }
}
