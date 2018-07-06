import * as React from "react";
import { Link, Route } from "react-router-dom";

import { ChapterConfig } from "../types/GuideTypes";

interface Props {
    title: string;
    chapters: Array<ChapterConfig>;
    guideSlug: string;

    // Actions
    toggleNav: () => void;
}

export default class GuideNavigation extends React.Component<Props> {

    public render() {

        const chapters = this.props.chapters.map((chapter, chapterIndex) => {

            const sections = chapter.sections.map((section, sectionIndex) => {
                return (
                    <li key={section.slug}>
                        <SectionLink
                            label={section.name}
                            to={`/guide/${this.props.guideSlug}/${chapter.slug}/${section.slug}`}
                            index={sectionIndex}
                            chapterIndex={chapterIndex}
                        />
                    </li>
                );
            });

            return (
                <li key={chapter.slug}>
                    <ChapterLink
                        label={chapter.name}
                        to={`/guide/${this.props.guideSlug}/${chapter.slug}`}
                        index={chapterIndex}
                    />
                    <ul className="section-nav">{sections}</ul>
                </li>
            );
        });
        return (
            <div id="guide-navigation">
                <button id="nav-close-button" className="btn-small" onClick={this.props.toggleNav}>&times;</button>
                <div className="centered">
                    <Link to="/">
                        <img id="guide-logo" src="/assets/img/logo.png" />
                    </Link>
                    <Link className="undecorated-link" to="/">
                        <h2>CS Guidebook</h2>
                    </Link>
                    <h3>{this.props.title}</h3>
                </div>
                <ul className="chapter-nav">{chapters}</ul>
            </div>
        );
    }
}

const ChapterLink = ({ label, to, index }: { label: string, to: string, index: number }) => (
    <Route
        path={to}
        children={({ match, location }) => {

            // Active url could also be of the form /guides/TOPIC
            const active = match || (index === 0 && location.pathname.split("/").length < 4);
            return (
                <Link
                    className={active ? "active nav-chapter-name": "nav-chapter-name"}
                    to={to}
                >
                    {label}
                </Link>
            );
        }}
    />
);

const SectionLink = ({ label, to, index, chapterIndex }:
    { label: string, to: string, index: number, chapterIndex: number }) => (
    <Route
        path={to}
        children={({ match, location }) => {

            // Active url could also be of the form /guides/TOPIC or /guides/TOPIC/chapter
            const active = match || (index === 0 && chapterIndex === 0 && location.pathname.split("/").length < 4) ||
                (index === 0 && location.pathname.split("/").length === 4 && to.split("/").length === 5 &&
                 to.startsWith(location.pathname));
            return (
                <Link
                    className={active ? "active nav-section-name": "nav-section-name"}
                    to={to}
                >
                    {label}
                </Link>
            );
        }}
    />
);
