import * as React from "react";
import { Link, Route } from "react-router-dom";

import { GuideConfig } from "../types/GuideTypes";
import GuideNavigation from "./GuideNavigation";
import GuideSection from "./GuideSection";

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

export class Guide extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            config: null
        };
    }

    public componentDidMount() {
        const guideSlug: string = this.props.match.params.guideSlug;
        fetch(`/guides/${guideSlug}/index.json`)
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
                <h1>Loading...</h1>
            );
        }
        const config: GuideConfig = this.state.config;
        return (
            <div>
                <h1>{config.title}</h1>
                <Link to="/">Back to Homepage</Link>
                <GuideNavigation
                    chapters={config.chapters}
                    guideSlug={this.props.match.params.guideSlug}
                />
                <Route path="/guide/:guideSlug/:chapterSlug/:sectionSlug?" component={GuideSection} />
            </div>
        );
    }
}
