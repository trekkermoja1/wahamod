"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestLogger = JestLogger;
function JestLogger() {
    return {
        fatal: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        debug: jest.fn(),
        trace: jest.fn(),
    };
}
//# sourceMappingURL=JestLogger.js.map