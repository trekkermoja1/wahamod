"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferedOutput = void 0;
class BufferedOutput {
    constructor() {
        this.outBuffer = [];
        this.errBuffer = [];
        this.writeOut = (str) => {
            this.outBuffer.push(str);
        };
        this.writeErr = (str) => {
            this.errBuffer.push(str);
        };
        this.outputError = (str, write) => {
            this.errBuffer.push(str);
        };
    }
    get out() {
        return this.outBuffer.join('');
    }
    get err() {
        return this.errBuffer.join('');
    }
}
exports.BufferedOutput = BufferedOutput;
//# sourceMappingURL=BufferedOutput.js.map