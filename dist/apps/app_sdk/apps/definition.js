"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPS = void 0;
const name_1 = require("./name");
exports.APPS = {
    [name_1.AppName.calls]: {
        name: name_1.AppName.calls,
        plainkey: false,
        queue: false,
        migrations: false,
    },
    [name_1.AppName.chatwoot]: {
        name: name_1.AppName.chatwoot,
        plainkey: true,
        queue: true,
        migrations: true,
    },
};
//# sourceMappingURL=definition.js.map