"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowebAuthFactoryCore = void 0;
const LocalStore_1 = require("../../storage/LocalStore");
const useMultiFileAuthState_1 = require("./useMultiFileAuthState");
class NowebAuthFactoryCore {
    buildAuth(store, name) {
        if (store instanceof LocalStore_1.LocalStore)
            return this.buildLocalAuth(store, name);
        throw new Error(`Unsupported store type '${store.constructor.name}'`);
    }
    async buildLocalAuth(store, name) {
        await store.init(name);
        const authFolder = store.getSessionDirectory(name);
        const { state, saveCreds, close } = await (0, useMultiFileAuthState_1.useMultiFileAuthState)(authFolder);
        return { state, saveCreds, close };
    }
}
exports.NowebAuthFactoryCore = NowebAuthFactoryCore;
//# sourceMappingURL=NowebAuthFactoryCore.js.map