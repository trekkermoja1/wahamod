"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GowsAuthFactoryCore = void 0;
const path = require("node:path");
const GowsAuthSimple_1 = require("./GowsAuthSimple");
const LocalStore_1 = require("../../../storage/LocalStore");
class GowsAuthFactoryCore {
    buildAuth(store, name) {
        if (store instanceof LocalStore_1.LocalStore)
            return this.buildSqlite3(store, name);
        throw new Error(`Unsupported store type '${store.constructor.name}'`);
    }
    async buildSqlite3(store, name) {
        await store.init(name);
        const authFolder = store.getSessionDirectory(name);
        const authFolderFullPath = path.resolve(authFolder);
        const connection = `file:${authFolderFullPath}/gows.db`;
        return new GowsAuthSimple_1.GowsAuthSimple(connection, 'sqlite3');
    }
}
exports.GowsAuthFactoryCore = GowsAuthFactoryCore;
//# sourceMappingURL=GowsAuthFactoryCore.js.map