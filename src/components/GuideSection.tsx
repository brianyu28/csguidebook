import * as React from "react";
import { Markdown } from "react-showdown";
import { InlineMath, BlockMath } from "react-katex";
import * as _ from "lodash";

import { ChapterConfig, GuideConfig, SectionConfig } from "../types/GuideTypes";
import Image from "./Image";
import "katex/dist/katex.min.css";

interface Props {
    match: {
        params: {
            guideSlug: string;
            chapterSlug: string;
            sectionSlug: string | undefined;
        }
    };
    history: any;
}

interface State {
    contentURL: string | null;
    content: string | null;
    error: boolean;
}

export default class GuideSection extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            contentURL: null,
            content: null,
            error: false
        };
    }

    public componentDidMount() {
        this.updateContents();
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps !== this.props) {
            this.updateContents();
        }
    }

    public updateContents() {
        const params = this.props.match.params;
        fetch(`/data/guides/${params.guideSlug}/index.json`)
        .then(res => res.json())
        .then((data: GuideConfig) => {
            let chapterConfig: ChapterConfig | undefined;

            // Use first chapter if no chapter specified.
            if (params.chapterSlug === undefined) {
                chapterConfig = data.chapters[0];
            } else {
                chapterConfig = _.find(data.chapters, (chapter) => {
                    return (chapter.slug === params.chapterSlug);
                });
            }


            // If the requested chapter wasn't found, show an error.
            if (chapterConfig === undefined) {
                if (this.state.error === false) {
                    this.setState({error: true});
                }
                return;
            }

            // Use first section if no section specified.
            let sectionConfig: SectionConfig | undefined;
            if (params.sectionSlug === undefined) {
                sectionConfig = chapterConfig.sections[0];
            } else {
                sectionConfig = _.find(chapterConfig.sections, (section) => {
                    return (section.slug === params.sectionSlug);
                });
            }

            // If the requested section wasn't found, show an error.
            if (sectionConfig === undefined) {
                if (this.state.error === false) {
                    this.setState({error: true});
                }
                return;
            }

            // Get the requested section.
            const contentURL = `/data/guides/${params.guideSlug}/${chapterConfig.dirname}/${sectionConfig.filename}`;
            if (this.state.contentURL === contentURL) {
                return;
            }
            fetch(contentURL)
            .then(res => res.text())
            .then(text => {
                this.setState({
                    contentURL,
                    content: text
                });
                const sidebar = document.querySelector("#guide-navigation")!;
                sidebar.classList.remove("mobile-active");
            });
        });
    }

    public render() {
        if (this.state.error) {
            return (
                <div className="section">
                    <h1>Error</h1>
                    <p>
                        There was an error loading the section you requested.
                        Perhaps the page does not exist?
                    </p>
                </div>
            )
        }

        if (this.state.content === null) {
            return (
                <div className="section">
                    <h1>Loading...</h1>
                </div>
            );
        }

        return (
            <div className="section">
                <Markdown
                    markup={this.state.content}
                    components={{ Image, InlineMath, BlockMath }}
                />
            </div>
        );
    }
}
