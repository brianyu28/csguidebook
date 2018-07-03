export interface GuideConfig {
    title: string;
    chapters: Array<ChapterConfig>;
}

export interface ChapterConfig {
    name: string;
    slug: string;
    dirname: string;
    sections: Array<SectionConfig>;
}

export interface SectionConfig {
    name: string;
    slug: string;
    filename: string;
}
