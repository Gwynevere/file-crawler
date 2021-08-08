import {v5 as uuidv5} from "uuid";
import {ParsedPathID, SEARCH_TYPES, WalkInputOptions} from "./typings";

const fs = require('fs');
const path = require('path');

async function walk({
                        dir,
                        paths = [],
                        type = SEARCH_TYPES.File,
                        crawl = true
                    }: WalkInputOptions): Promise<ParsedPathID[]> {
    const data = fs.readdirSync(dir);

    for (let p of data) {
        const fullPath = path.join(dir, p)

        if (fs.existsSync(fullPath)) {
            const file_info = fs.lstatSync(fullPath);
            const file_stats = fs.statSync(fullPath);

            if (file_info[type]()) {
                const file_parsed_data = path.parse(fullPath);

                paths.push({
                    ...file_parsed_data,
                    id: uuidv5(file_parsed_data?.name, uuidv5.URL),
                    size: file_stats.size / (1024 * 1024),
                })
            }

            if (crawl && file_info.isDirectory()) {
                await walk({dir: fullPath, paths, type, crawl})
            }
        }
    }

    return paths;
}

async function find({
                        id,
                        dir,
                        type = SEARCH_TYPES.File,
                        crawl = true
                    }: { id: string, dir: string, type?: SEARCH_TYPES, crawl?: boolean }): Promise<string> {
    const data = fs.readdirSync(dir);

    for (let p of data) {
        const fullPath = path.join(dir, p)

        if (fs.existsSync(fullPath)) {
            const file_info = fs.lstatSync(fullPath);

            if (file_info[type]()) {
                const file_parsed_data = path.parse(fullPath);
                const uuid = uuidv5(file_parsed_data?.name, uuidv5.URL)

                if (id === uuid) {
                    return fullPath;
                }
            }

            if (crawl && file_info.isDirectory()) {
                const path = await find({id, dir: fullPath, type, crawl})

                if (path.length > 0) {
                    return path
                }
            }
        }
    }

    return "";
}

function findFile(id: string, dir: string, crawl = true): Promise<string> {
    return find({id, dir, crawl, type: SEARCH_TYPES.File})
}

function findDirectory(id: string, dir: string, crawl = true) {
    return find({id, dir, crawl, type: SEARCH_TYPES.Directory})
}

function listFiles(dir: string) {
    return walk({dir, crawl: false})
}

function listDirectories(dir: string) {
    return walk({dir, type: SEARCH_TYPES.Directory, crawl: false})
}

function listAllFiles(dir: string) {
    return walk({dir})
}

function listAllDirectories(dir: string) {
    return walk({dir, type: SEARCH_TYPES.Directory})
}

export {findFile, findDirectory, listFiles, listAllFiles, listDirectories, listAllDirectories, SEARCH_TYPES}
