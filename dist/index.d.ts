import { ParsedPathID, SEARCH_TYPES } from "./types";
declare function findFile(id: string, dir: string, crawl?: boolean): Promise<string>;
declare function findDirectory(id: string, dir: string, crawl?: boolean): Promise<string>;
declare function listFiles(dir: string): Promise<ParsedPathID[]>;
declare function listDirectories(dir: string): Promise<ParsedPathID[]>;
declare function listAllFiles(dir: string): Promise<ParsedPathID[]>;
declare function listAllDirectories(dir: string): Promise<ParsedPathID[]>;
export { findFile, findDirectory, listFiles, listAllFiles, listDirectories, listAllDirectories, SEARCH_TYPES };
