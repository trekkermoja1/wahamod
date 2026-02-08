"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadESMModules = loadESMModules;
const esm = {
    b: null,
};
const modules = {
    b: '@adiwajshing/baileys',
};
async function loadESMModules() {
    for (const [key, value] of Object.entries(modules)) {
        if (esm[key]) {
            throw new Error(`Module '${key}' is already loaded`);
        }
        esm[key] = await Promise.resolve(`${value}`).then(s => require(s));
    }
}
exports.default = esm;
//# sourceMappingURL=esm.js.map