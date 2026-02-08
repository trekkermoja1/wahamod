"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSessionConfigRepository = void 0;
const fs = require('fs-extra');
const files_1 = require("../../utils/files");
const ISessionConfigRepository_1 = require("./ISessionConfigRepository");
const writeFileAtomic = require('write-file-atomic');
class LocalSessionConfigRepository extends ISessionConfigRepository_1.ISessionConfigRepository {
    constructor(store) {
        super();
        this.FILENAME = '.waha.session.config.json';
        this.store = store;
    }
    async exists(sessionName) {
        const filepath = this.getFilePath(sessionName);
        const exists = await (0, files_1.fileExists)(filepath);
        if (!exists) {
            const folder = this.store.getSessionDirectory(sessionName);
            return await (0, files_1.fileExists)(folder);
        }
        return true;
    }
    async getConfig(sessionName) {
        const filepath = this.getFilePath(sessionName);
        if (!(await (0, files_1.fileExists)(filepath))) {
            return null;
        }
        let content;
        try {
            content = await fs.readFile(filepath, 'utf-8');
        }
        catch (error) {
            return null;
        }
        return JSON.parse(content);
    }
    async saveConfig(sessionName, config) {
        const folder = this.store.getSessionDirectory(sessionName);
        await fs.mkdir(folder, { recursive: true });
        const filepath = this.getFilePath(sessionName);
        const content = JSON.stringify(config || {});
        await writeFileAtomic(filepath, content);
    }
    getFilePath(sessionName) {
        return this.store.getFilePath(sessionName, this.FILENAME);
    }
    async deleteConfig(sessionName) {
        const sessionDirectory = this.store.getSessionDirectory(sessionName);
        await fs.remove(sessionDirectory);
    }
    async getAllConfigs() {
        await this.store.init();
        const content = await fs.readdir(this.store.getEngineDirectory(), {
            withFileTypes: true,
        });
        return content
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
    }
    async init() {
        return;
    }
}
exports.LocalSessionConfigRepository = LocalSessionConfigRepository;
//# sourceMappingURL=LocalSessionConfigRepository.js.map