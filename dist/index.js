"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllDirectories = exports.listDirectories = exports.listAllFiles = exports.listFiles = exports.findDirectory = exports.findFile = void 0;
var uuid_1 = require("uuid");
var fs = require('fs');
var path = require('path');
function walk(_a) {
    var dir = _a.dir, _b = _a.paths, paths = _b === void 0 ? [] : _b, _c = _a.type, type = _c === void 0 ? "isFile" /* File */ : _c, _d = _a.crawl, crawl = _d === void 0 ? true : _d;
    return __awaiter(this, void 0, void 0, function () {
        var data, _i, data_1, p, fullPath, file_info, file_stats, file_parsed_data;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    data = fs.readdirSync(dir);
                    _i = 0, data_1 = data;
                    _e.label = 1;
                case 1:
                    if (!(_i < data_1.length)) return [3 /*break*/, 4];
                    p = data_1[_i];
                    fullPath = path.join(dir, p);
                    if (!fs.existsSync(fullPath)) return [3 /*break*/, 3];
                    file_info = fs.lstatSync(fullPath);
                    file_stats = fs.statSync(fullPath);
                    if (file_info[type]()) {
                        file_parsed_data = path.parse(fullPath);
                        paths.push(__assign(__assign({}, file_parsed_data), { id: uuid_1.v5(file_parsed_data === null || file_parsed_data === void 0 ? void 0 : file_parsed_data.name, uuid_1.v5.URL), size: file_stats.size / (1024 * 1024) }));
                    }
                    if (!(crawl && file_info.isDirectory())) return [3 /*break*/, 3];
                    return [4 /*yield*/, walk({ dir: fullPath, paths: paths, type: type, crawl: crawl })];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, paths];
            }
        });
    });
}
function find(_a) {
    var id = _a.id, dir = _a.dir, _b = _a.type, type = _b === void 0 ? "isFile" /* File */ : _b, _c = _a.crawl, crawl = _c === void 0 ? true : _c;
    return __awaiter(this, void 0, void 0, function () {
        var data, _i, data_2, p, fullPath, file_info, file_parsed_data, uuid, path_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    data = fs.readdirSync(dir);
                    _i = 0, data_2 = data;
                    _d.label = 1;
                case 1:
                    if (!(_i < data_2.length)) return [3 /*break*/, 4];
                    p = data_2[_i];
                    fullPath = path.join(dir, p);
                    if (!fs.existsSync(fullPath)) return [3 /*break*/, 3];
                    file_info = fs.lstatSync(fullPath);
                    if (file_info[type]()) {
                        file_parsed_data = path.parse(fullPath);
                        uuid = uuid_1.v5(file_parsed_data === null || file_parsed_data === void 0 ? void 0 : file_parsed_data.name, uuid_1.v5.URL);
                        if (id === uuid) {
                            return [2 /*return*/, fullPath];
                        }
                    }
                    if (!(crawl && file_info.isDirectory())) return [3 /*break*/, 3];
                    return [4 /*yield*/, find({ id: id, dir: fullPath, type: type, crawl: crawl })];
                case 2:
                    path_1 = _d.sent();
                    if (path_1.length > 0) {
                        return [2 /*return*/, path_1];
                    }
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, ""];
            }
        });
    });
}
function findFile(id, dir, crawl) {
    if (crawl === void 0) { crawl = true; }
    return find({ id: id, dir: dir, crawl: crawl, type: "isFile" /* File */ });
}
exports.findFile = findFile;
function findDirectory(id, dir, crawl) {
    if (crawl === void 0) { crawl = true; }
    return find({ id: id, dir: dir, crawl: crawl, type: "isDirectory" /* Directory */ });
}
exports.findDirectory = findDirectory;
function listFiles(dir) {
    return walk({ dir: dir, crawl: false });
}
exports.listFiles = listFiles;
function listDirectories(dir) {
    return walk({ dir: dir, type: "isDirectory" /* Directory */, crawl: false });
}
exports.listDirectories = listDirectories;
function listAllFiles(dir) {
    return walk({ dir: dir });
}
exports.listAllFiles = listAllFiles;
function listAllDirectories(dir) {
    return walk({ dir: dir, type: "isDirectory" /* Directory */ });
}
exports.listAllDirectories = listAllDirectories;
