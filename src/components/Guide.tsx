import * as React from "react";
import { Route } from "react-router-dom";

import { GuideConfig } from "../types/GuideTypes";
import GuideNavigation from "./GuideNavigation";
import GuideSection from "./GuideSection";

import "../css/Guide.css";

interface Props {
    match: {
        params: {
            guideSlug: string;
        }
    };
}

interface State {
    config: GuideConfig | null;
}

export default class Guide extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            config: null
        };
    }

    public componentDidMount() {
        const guideSlug: string = this.props.match.params.guideSlug;
        fetch(`/data/guides/${guideSlug}/index.json`)
        .then(res => res.json())
        .then((data: GuideConfig) => {
            this.setState({
                config: data,
            });
        });
    }

    public render() {
        if (this.state.config === null) {
            return (
                <div className="guide">
                    <h1>Loading...</h1>
                </div>
            );
        }
        const config: GuideConfig = this.state.config;
        return (
            <div className="guide">
                <div className="guide-header">
                    <h1>{config.title}</h1>
                </div>
                <div className="guide-container">
                    <GuideNavigation
                        chapters={config.chapters}
                        guideSlug={this.props.match.params.guideSlug}
                        toggleNav={this.toggleNav}
                    />
                    <div className="guide-content">
                        <button className="btn-primary btn-small" id="guide-nav-toggle" onClick={this.toggleNav}>Navigation</button>
                        <Route path="/guide/:guideSlug/:chapterSlug?/:sectionSlug?" component={GuideSection} />
                    </div>
                </div>
            </div>
        );
    }

    public toggleNav() {
        const sidebar = document.querySelector("#guide-navigation")!;
        sidebar.classList.toggle("mobile-active");
    }
}
