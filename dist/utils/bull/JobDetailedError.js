"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDetailedError = void 0;
const util = require("node:util");
class JobDetailedError extends Error {
    constructor(err) {
        const inspected = util.inspect(err, {
            showHidden: false,
            depth: 2,
            colors: false,
        });
        super(inspected);
        this.name = 'JobDetailedError';
        this.originalError = err;
        if (err instanceof Error && err.stack) {
            this.stack = `${this.name}:\n${inspected}`;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.JobDetailedError = JobDetailedError;
//# sourceMappingURL=JobDetailedError.js.map