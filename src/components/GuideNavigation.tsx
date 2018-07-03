import * as React from "react";
import { Link, Route } from "react-router-dom";

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
                        <SectionLink
                            label={section.name}
                            to={`/guide/${this.props.guideSlug}/${chapter.slug}/${section.slug}`}
                        />
                    </li>
                );
            });

            return (
                <li key={chapter.slug}>
                    <ChapterLink label={chapter.name} to={`/guide/${this.props.guideSlug}/${chapter.slug}`} />
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

const ChapterLink = ({ label, to }: { label: string, to: string }) => (
    <Route
        path={to}
        children={({ match }) => (
            <Link
                className={match ? "active nav-chapter-name": "nav-chapter-name"}
                to={to}
            >
                {label}
            </Link>
        )}
    />
);

const SectionLink = ({ label, to }: { label: string, to: string }) => (
    <Route
        path={to}
        children={({ match }) => (
            <Link
                className={match ? "active nav-section-name": "nav-section-name"}
                to={to}
            >
                {label}
            </Link>
        )}
    />
);
