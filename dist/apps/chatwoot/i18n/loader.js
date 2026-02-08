"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlLocaleLoader = void 0;
const fs = require("fs-extra");
const path = require("path");
const yaml = require("yaml");
class YamlLocaleLoader {
    constructor(dir, ext) {
        this.dir = dir;
        this.ext = ext;
    }
    load() {
        const result = {};
        const files = fs.readdirSync(this.dir, { withFileTypes: true });
        for (const entry of files) {
            if (!entry.isFile())
                continue;
            const filename = entry.name;
            if (!filename.endsWith(`.${this.ext}`))
                continue;
            const locale = path.basename(filename, `.${this.ext}`);
            const filePath = path.join(this.dir, filename);
            const content = fs.readFileSync(filePath, 'utf-8');
            const parsed = yaml.parse(content);
            if (parsed && typeof parsed === 'object') {
                result[locale] = parsed;
            }
        }
        return result;
    }
}
exports.YamlLocaleLoader = YamlLocaleLoader;
//# sourceMappingURL=loader.js.map