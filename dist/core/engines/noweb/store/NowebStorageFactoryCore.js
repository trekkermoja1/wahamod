"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowebStorageFactoryCore = void 0;
const LocalStore_1 = require("../../../storage/LocalStore");
const Sqlite3Storage_1 = require("./sqlite3/Sqlite3Storage");
class NowebStorageFactoryCore {
    createStorage(store, name) {
        if (store instanceof LocalStore_1.LocalStore) {
            return this.buildStorageSqlite3(store, name);
        }
        throw new Error(`Unsupported store type '${store.constructor.name}'`);
    }
    buildStorageSqlite3(store, name) {
        const filePath = store.getFilePath(name, 'store.sqlite3');
        return new Sqlite3Storage_1.Sqlite3Storage(filePath);
    }
}
exports.NowebStorageFactoryCore = NowebStorageFactoryCore;
//# sourceMappingURL=NowebStorageFactoryCore.js.map