/// <reference types="node" />
import { ParsedPath } from "path";
export interface WalkInputOptions {
    dir: string;
    paths?: ParsedPathID[];
    type?: SEARCH_TYPES;
    crawl?: boolean;
}
export interface ParsedPathID extends ParsedPath {
    id: string;
    size: string;
}
declare const enum SEARCH_TYPES {
    'File' = "isFile",
    'Directory' = "isDirectory"
}
export { SEARCH_TYPES };
