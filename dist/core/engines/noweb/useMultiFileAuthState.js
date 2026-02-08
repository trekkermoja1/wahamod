"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultiFileAuthState = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const esm_1 = require("../../../vendor/esm");
const writeFileAtomic = require('write-file-atomic');
const AsyncLock = require('async-lock');
const fileLock = new AsyncLock({
    timeout: 5000,
    maxPending: Infinity,
    maxExecutionTime: 30000,
});
const useMultiFileAuthState = async (folder) => {
    const writeData = (data, file) => {
        const filePath = (0, path_1.join)(folder, fixFileName(file));
        return fileLock.acquire(filePath, () => writeFileAtomic((0, path_1.join)(filePath), JSON.stringify(data, esm_1.default.b.BufferJSON.replacer)));
    };
    const readData = async (file) => {
        try {
            const filePath = (0, path_1.join)(folder, fixFileName(file));
            const data = await fileLock.acquire(filePath, () => (0, promises_1.readFile)(filePath, { encoding: 'utf-8' }));
            return JSON.parse(data, esm_1.default.b.BufferJSON.reviver);
        }
        catch (error) {
            return null;
        }
    };
    const removeData = async (file) => {
        try {
            const filePath = (0, path_1.join)(folder, fixFileName(file));
            await fileLock.acquire(filePath, () => (0, promises_1.unlink)(filePath));
        }
        catch (_a) { }
    };
    const folderInfo = await (0, promises_1.stat)(folder).catch(() => {
        return null;
    });
    if (folderInfo) {
        if (!folderInfo.isDirectory()) {
            throw new Error(`found something that is not a directory at ${folder}, either delete it or specify a different location`);
        }
    }
    else {
        await (0, promises_1.mkdir)(folder, { recursive: true });
    }
    const fixFileName = (file) => { var _a; return ((_a = file === null || file === void 0 ? void 0 : file.replace(/\//g, '__')) === null || _a === void 0 ? void 0 : _a.replace(/:/g, '-')) || ''; };
    const creds = (await readData('creds.json')) || esm_1.default.b.initAuthCreds();
    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    await Promise.all(ids.map(async (id) => {
                        let value = await readData(`${type}-${id}.json`);
                        if (type === 'app-state-sync-key' && value) {
                            value = esm_1.default.b.proto.Message.AppStateSyncKeyData.create(value);
                        }
                        data[id] = value;
                    }));
                    return data;
                },
                set: async (data) => {
                    const tasks = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];
                            const file = `${category}-${id}.json`;
                            tasks.push(value ? writeData(value, file) : removeData(file));
                        }
                    }
                    await Promise.all(tasks);
                },
            },
        },
        saveCreds: () => {
            return writeData(creds, 'creds.json');
        },
        close: async () => {
            return;
        },
    };
};
exports.useMultiFileAuthState = useMultiFileAuthState;
//# sourceMappingURL=useMultiFileAuthState.js.map