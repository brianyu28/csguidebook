import * as React from "react";

interface Props {
    guide: string;
    filename: string;
    alt: string;
    height?: string;
    width?: string;
}

const DEFAULT_HEIGHT: string = "250px";
const DEFAULT_WIDTH: string = "auto";

export default class Image extends React.Component<Props> {

    public render() {

        const imgStyle = {
            display: "block",
            height: this.props.height !== undefined ? this.props.height : DEFAULT_HEIGHT,
            width: this.props.width !== undefined ? this.props.width : DEFAULT_WIDTH,
            marginLeft: "auto",
            marginRight: "auto"
        };

        return (
            <img
                src={"/data/guides/" + this.props.guide + "/img/" + this.props.filename}
                alt={this.props.alt}
                style={imgStyle}
            />
        );
    }
}
