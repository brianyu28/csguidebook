import * as React from "react";

interface Props {
    guide: string;
    filename: string;
    alt: string;
    width?: string;
}

const DEFAULT_WIDTH: string = "600px";

export default class Image extends React.Component<Props> {

    public render() {

        const imgStyle = {
            display: "block",
            width: this.props.width !== undefined ? this.props.width : DEFAULT_WIDTH,
            maxWidth: "100%",
            marginLeft: "auto",
            marginRight: "auto"
        };

        return (
            <img
                src={"/data/guides/" + this.props.guide + "/img/" + this.props.filename}
                alt={this.props.alt}
                title={this.props.alt}
                style={imgStyle}
            />
        );
    }
}
