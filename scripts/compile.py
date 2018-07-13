"""
compile.py
Compilation script for Scrivener documents to Markdown hierarchy.
"""

import json
import os
import sys

def main():
    contents = get_file_contents()
    document = process_document(contents)
    generate_index(document)
    generate_files(document)

def get_file_contents():
    filename = sys.argv[1]
    return open(filename, encoding="utf-8").read()

def process_document(contents):
    chapters = list(filter(lambda chapter: chapter != "", contents.split("=====CHAPTER=====")))
    return {
        "metadata": process_metadata(chapters[0]),
        "chapters": list(filter(lambda chapter: chapter is not None, map(process_chapter, chapters[1:])))
    }

def process_metadata(raw_data):
    data = {}
    for line in raw_data.strip().split("\n"):
        if ":" in line:
            key, value = line.split(":\t")
            data[key.strip()] = value.strip()
    return data

def process_chapter(chapter):
    sections = chapter.split("=====SECTION=====")
    metadata, sections = sections[0], sections[1:]
    chapter = {
        "metadata": process_metadata(metadata),
        "sections": list(filter(lambda section: section is not None, map(process_section, sections)))
    }
    return chapter if validate_chapter(chapter) else None

def validate_chapter(chapter):
    return all(meta in chapter["metadata"] for meta in ["filename", "slug", "name"])

def process_section(section):
    try:
        metadata, contents = section.strip().split("\n\n", 1)
    except ValueError:  # no contents
        return None
    section = {
        "metadata": process_metadata(metadata),
        "contents": contents
    }
    return section if validate_section(section) else None

def validate_section(chapter):
    return all(meta in chapter["metadata"] for meta in ["filename", "slug", "name"])

def generate_index(document):
    index = open(document["metadata"]["filename"], "w", encoding="utf-8")
    data = {
        "title": document["metadata"]["name"],
        "chapters": generate_index_chapters(document["chapters"])
    }
    index.write(json.dumps(data, indent=4))
    index.close()

def generate_index_chapters(chapters):
    return [{
        "name": chapter["metadata"]["name"],
        "slug": chapter["metadata"]["slug"],
        "dirname": chapter["metadata"]["filename"],
        "sections": generate_index_sections(chapter["sections"])
    } for chapter in chapters]

def generate_index_sections(sections):
    return [{
        "name": section["metadata"]["name"],
        "slug": section["metadata"]["slug"],
        "filename": section["metadata"]["filename"]
    } for section in sections]

def generate_files(document):
    for chapter in document["chapters"]:
        generate_chapter_files(chapter)

def generate_chapter_files(chapter):
    filename = chapter["metadata"]["filename"]
    if not os.path.exists(filename):
        os.makedirs(filename)
    for section in chapter["sections"]:
        generate_section_files(filename, section)

def generate_section_files(dirname, section):
    filename = os.path.join(dirname, section["metadata"]["filename"])
    with open(filename, "w", encoding="utf-8") as f:
        f.write(section["contents"])

if __name__ == "__main__":
    main()
