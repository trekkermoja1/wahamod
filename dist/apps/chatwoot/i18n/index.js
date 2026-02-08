"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = void 0;
const path = require("path");
const loader_1 = require("./loader");
const i18n_1 = require("./i18n");
const env_1 = require("../env");
const i18n = new i18n_1.I18N();
exports.i18n = i18n;
const localesDir = path.join(__dirname, 'locales');
i18n.load(new loader_1.YamlLocaleLoader(localesDir, 'yml').load());
i18n.load(new loader_1.YamlLocaleLoader(localesDir, 'yaml').load());
const additional = env_1.APPS_CHATWOOT_LANGUAGES_FOLDER;
if (additional) {
    const resolved = path.resolve(additional);
    i18n.load(new loader_1.YamlLocaleLoader(resolved, 'yml').load());
    i18n.load(new loader_1.YamlLocaleLoader(resolved, 'yaml').load());
}
//# sourceMappingURL=index.js.map