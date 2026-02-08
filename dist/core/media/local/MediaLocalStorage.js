"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaLocalStorage = void 0;
const enums_dto_1 = require("../../../structures/enums.dto");
const fsp = require("fs/promises");
const path = require("path");
const fs = require("fs");
const files_1 = require("../../../utils/files");
const del_1 = require("del");
const writeFileAtomic = require('write-file-atomic');
class MediaLocalStorage {
    constructor(log, filesFolder, baseUrl, lifetimeSeconds) {
        this.log = log;
        this.filesFolder = filesFolder;
        this.baseUrl = baseUrl;
        this.lifetimeMs = lifetimeSeconds * enums_dto_1.SECOND;
        if (this.lifetimeMs === 0) {
            this.log.info('Files lifetime is 0, files will not be removed');
        }
    }
    async init() {
        return;
    }
    async exists(data) {
        const filepath = this.getFullPath(data);
        return await (0, files_1.fileExists)(filepath);
    }
    async save(buffer, data) {
        const filepath = this.getFullPath(data);
        const folder = path.dirname(filepath);
        await fsp.mkdir(folder, { recursive: true });
        await writeFileAtomic(filepath, buffer);
        this.postponeRemoval(filepath);
        return true;
    }
    async getStorageData(data) {
        const filename = this.getKey(data);
        const url = this.baseUrl + filename;
        return { url };
    }
    async purge() {
        if (this.lifetimeMs === 0) {
            this.log.info('No need to purge files with lifetime 0');
            return;
        }
        if (fs.existsSync(this.filesFolder)) {
            (0, del_1.deleteAsync)([`${this.filesFolder}/*`], { force: true }).then((paths) => {
                if (paths.length === 0) {
                    return;
                }
                this.log.info(`Deleted files and directories:\n${paths.join('\n')}`);
            });
        }
        else {
            fs.mkdirSync(this.filesFolder);
            this.log.info(`Directory '${this.filesFolder}' created from scratch`);
        }
    }
    getKey(data) {
        return `${data.session}/${data.message.id}.${data.file.extension}`;
    }
    getFullPath(data) {
        const filepath = this.getKey(data);
        return path.resolve(`${this.filesFolder}/${filepath}`);
    }
    postponeRemoval(filepath) {
        if (this.lifetimeMs === 0) {
            return;
        }
        setTimeout(() => fs.unlink(filepath, () => {
            this.log.info(`File ${filepath} was removed`);
        }), this.lifetimeMs);
    }
    async close() {
        return;
    }
}
exports.MediaLocalStorage = MediaLocalStorage;
//# sourceMappingURL=MediaLocalStorage.js.map