import * as React from "react";
import { Link } from "react-router-dom";

import "../css/Header.css";

export default class Header extends React.Component {

  public render() {
    return (
        <div className="site-header">
            <Link to="/">
                <img src="/assets/img/logo.png" />
            </Link>
            <Link className="site-header-title" to="/">CS Guidebook</Link>
        </div>
    );
  }
}
