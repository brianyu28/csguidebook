import * as React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

export default class Welcome extends React.Component {

    private linkData = [
        {"name": "Git", "url": "git"},
        {"name": "Graph Theory", "url":"graph-theory"}
    ];

    public render() {

        const links = this.linkData.map((link) => (
            <div>
                <Link to={"/guide/" + link.url}>{link.name}</Link>
                <br/>
            </div>
        ));

        return (
            <div className="homepage-header">
                <Header />
                <img id="homepage-logo" src="/assets/img/logo.png" />
                <h1>CS Guidebook</h1>
                Learn about...
                <br/><br/>
                {links}
                <br/><hr/><br/>
                CS Guidebook is a work in progress by <a href="https://www.brianyu.me" target="_blank">Brian Yu</a>.
            </div>
        );
    }
}
