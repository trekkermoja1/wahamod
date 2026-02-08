"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTimeoutOption = exports.JobAttemptsOption = void 0;
exports.ParseMS = ParseMS;
exports.ParseSeconds = ParseSeconds;
exports.ProgressOption = ProgressOption;
exports.NotNegativeNumber = NotNegativeNumber;
exports.PositiveNumber = PositiveNumber;
const ms = require("ms");
const commander_1 = require("commander");
function ParseMS(value) {
    const duration = ms(value);
    if (duration == null)
        throw new Error(`Invalid duration: "${value}"`);
    if (duration < 0)
        throw new Error(`Duration cannot be negative: "${value}"`);
    return duration;
}
function ParseSeconds(value) {
    const duration = ParseMS(value);
    return Math.floor(duration / 1000);
}
class JobAttemptsOption extends commander_1.Option {
    constructor(l, def) {
        super('--at, --attempts <number>', l.r('cli.cmd.options.job.attempts'));
        this.argParser(NotNegativeNumber);
        this.default(def);
    }
}
exports.JobAttemptsOption = JobAttemptsOption;
class JobTimeoutOption extends commander_1.Option {
    constructor(l, def) {
        super('-t, --timeout <duration>', l.r('cli.cmd.options.job.timeout'));
        this.argParser(ParseMS);
        this.default(ParseMS(def));
    }
}
exports.JobTimeoutOption = JobTimeoutOption;
function ProgressOption(description, def = 1000) {
    return new commander_1.Option('-p, --progress [number]', description)
        .argParser(NotNegativeNumber)
        .default(def);
}
function NotNegativeNumber(value) {
    const n = parseInt(value, 10);
    if (isNaN(n)) {
        throw new Error(`Invalid number: "${value}"`);
    }
    if (n < 0) {
        throw new Error(`Number must be positive or 0: "${value}"`);
    }
    return n;
}
function PositiveNumber(value) {
    const n = parseInt(value, 10);
    if (isNaN(n)) {
        throw new Error(`Invalid number: "${value}"`);
    }
    if (n <= 0) {
        throw new Error(`Number must be positive: "${value}"`);
    }
    return n;
}
//# sourceMappingURL=options.js.map