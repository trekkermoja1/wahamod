"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStoreCore = void 0;
const files_1 = require("../../utils/files");
const fs = require("fs/promises");
const knex_1 = require("knex");
const path = require("path");
const LocalStore_1 = require("./LocalStore");
const env_1 = require("../env");
class LocalStoreCore extends LocalStore_1.LocalStore {
    constructor(engine) {
        super();
        this.baseDirectory = process.env.WAHA_LOCAL_STORE_BASE_DIR || './.sessions';
        this.engine = engine;
    }
    async init(sessionName) {
        await fs.mkdir(this.getEngineDirectory(), { recursive: true });
        if (!this.knex) {
            this.knex = this.buildKnex();
            await this.knex.raw('PRAGMA journal_mode = WAL;');
            await this.knex.raw('PRAGMA foreign_keys = ON;');
            await this.knex.raw('PRAGMA busy_timeout = 5000;');
        }
        if (sessionName) {
            await fs.mkdir(this.getSessionDirectory(sessionName), {
                recursive: true,
            });
        }
    }
    getBaseDirectory() {
        return path.resolve(this.baseDirectory);
    }
    getEngineDirectory() {
        return (0, files_1.safeJoin)(this.baseDirectory, this.engine);
    }
    getSessionDirectory(name) {
        return this.getDirectoryPath(name);
    }
    getFilePath(session, file) {
        return (0, files_1.safeJoin)(this.getSessionDirectory(session), file);
    }
    getDirectoryPath(name) {
        return (0, files_1.safeJoin)(this.getEngineDirectory(), name);
    }
    getWAHADatabase() {
        if (!this.knex) {
            throw new Error('Knex is not initialized, call LocalStore.init() first');
        }
        return this.knex;
    }
    buildKnex() {
        const engineDir = this.getEngineDirectory();
        const database = path.join(engineDir, 'waha.sqlite3');
        return (0, knex_1.default)({
            client: env_1.KNEX_SQLITE_CLIENT,
            connection: { filename: database },
            useNullAsDefault: true,
            acquireConnectionTimeout: 120000,
            pool: {
                min: 1,
                max: 10,
                idleTimeoutMillis: 60000,
                createTimeoutMillis: 120000,
                acquireTimeoutMillis: 120000,
            },
        });
    }
    async close() {
        await this.knex.destroy();
    }
}
exports.LocalStoreCore = LocalStoreCore;
//# sourceMappingURL=LocalStoreCore.js.map