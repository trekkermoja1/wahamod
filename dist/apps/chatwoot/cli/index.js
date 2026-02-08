"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPrefix = void 0;
exports.runText = runText;
const commander_1 = require("commander");
const shell_quote_1 = require("shell-quote");
const BufferedOutput_1 = require("./utils/BufferedOutput");
const program_a_1 = require("./program.a");
const env_1 = require("../env");
async function runText(commands, ctx, text) {
    text = text
        .split('\n')
        .map((line) => line.trimStart())
        .join(' ')
        .trim();
    const output = new BufferedOutput_1.BufferedOutput();
    const program = (0, program_a_1.BuildProgram)(commands, ctx, output);
    const argv = (0, shell_quote_1.parse)(text);
    try {
        await program.parseAsync(argv, { from: 'user' });
    }
    catch (err) {
        if (err instanceof commander_1.CommanderError) {
            return output;
        }
        else {
            throw err;
        }
    }
    return output;
}
exports.CommandPrefix = env_1.CHATWOOT_COMMAND_PREFIX;
//# sourceMappingURL=index.js.map