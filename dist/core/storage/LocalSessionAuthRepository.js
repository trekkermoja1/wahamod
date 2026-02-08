"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSessionAuthRepository = void 0;
const fs = require('fs-extra');
const ISessionAuthRepository_1 = require("./ISessionAuthRepository");
const KEEP_FILES = /^\.waha\.session\..*$/;
class LocalSessionAuthRepository extends ISessionAuthRepository_1.ISessionAuthRepository {
    constructor(store) {
        super();
        this.store = store;
    }
    async init(sessionName) {
        await this.store.init(sessionName);
    }
    async clean(sessionName) {
        const sessionDirectory = this.store.getSessionDirectory(sessionName);
        const exists = await fs.pathExists(sessionDirectory);
        if (!exists) {
            return;
        }
        const files = await fs.readdir(sessionDirectory);
        const filesToRemove = files.filter((file) => !file.match(KEEP_FILES));
        for (const file of filesToRemove) {
            await fs.remove(`${sessionDirectory}/${file}`);
        }
    }
}
exports.LocalSessionAuthRepository = LocalSessionAuthRepository;
//# sourceMappingURL=LocalSessionAuthRepository.js.map