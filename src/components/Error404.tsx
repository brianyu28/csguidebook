import * as React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

export default class Error404 extends React.Component {

  public render() {
    return (
        <div className="homepage-header">
            <Header />
            <h1>Page Not Found</h1>
            Sorry, the page you requested could not be found.
            <br/><br/>
            <Link to="/">Return to Homepage</Link>
        </div>
    );
  }
}
