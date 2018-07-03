import * as React from "react";
import { Link } from "react-router-dom";

import { ChapterConfig } from "../types/GuideTypes";

interface Props {
    chapters: Array<ChapterConfig>;
    guideSlug: string;
}

export default class GuideNavigation extends React.Component<Props> {

    public render() {

        const chapters = this.props.chapters.map(chapter => {

            const sections = chapter.sections.map(section => {
                return (
                    <li key={section.slug}>
                        <Link to={`/guide/${this.props.guideSlug}/${chapter.slug}/${section.slug}`}>
                            {section.name}
                        </Link>
                    </li>
                );
            });

            return (
                <li key={chapter.slug}>
                    <Link className="nav-chapter-name" to={`/guide/${this.props.guideSlug}/${chapter.slug}`}>
                        {chapter.name}
                    </Link>
                    <ul className="section-nav">{sections}</ul>
                </li>
            );
        });
        return (
            <div className="guide-navigation">
                <Link to="/"><button className="btn-small">Back to Homepage</button></Link>
                <h2>Table of Contents</h2>
                <ul className="chapter-nav">{chapters}</ul>
            </div>
        );
    }
}
