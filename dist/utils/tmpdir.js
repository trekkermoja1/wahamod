"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TmpDir = void 0;
const fs = require("fs/promises");
const os = require("os");
const path = require("path");
function sanitize(input) {
    return input.replace(/[^a-zA-Z0-9-_]/g, '_');
}
class TmpDir {
    constructor(logger, prefix, cleanupTimeout = 10000) {
        this.logger = logger;
        this.cleanupTimeout = cleanupTimeout;
        this.prefix = sanitize(prefix);
        if (this.prefix.length > 249) {
            this.prefix = this.prefix.slice(0, 249);
        }
    }
    async use(callback) {
        const dir = await fs.mkdtemp(path.join(os.tmpdir(), this.prefix));
        try {
            return await callback(dir);
        }
        finally {
            setTimeout(async () => {
                fs.rm(dir, { recursive: true, force: true })
                    .then(() => {
                    this.logger.trace(`Cleaned up temporary directory '${dir}'`);
                })
                    .catch((err) => {
                    this.logger.warn(`Failed to clean up temporary directory '${dir}': ${err.message}`);
                });
            }, this.cleanupTimeout);
        }
    }
}
exports.TmpDir = TmpDir;
//# sourceMappingURL=tmpdir.js.map