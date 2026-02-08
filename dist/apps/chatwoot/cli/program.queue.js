"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQueueCommand = AddQueueCommand;
const commander_1 = require("commander");
const cmd_disabled_1 = require("./cmd.disabled");
const cmd_queue_1 = require("./cmd.queue");
function AddQueueCommand(program, ctx, enabled) {
    const l = ctx.l;
    const QueueGroup = l.r('cli.cmd.root.sub.queue');
    program.commandsGroup(QueueGroup);
    program
        .command('queue', { hidden: !enabled })
        .alias('q')
        .summary(l.r('cli.cmd.queue.summary'))
        .description(l.r('cli.cmd.queue.description'))
        .helpGroup(QueueGroup)
        .addArgument(new commander_1.Argument('[action]', l.r('cli.cmd.queue.action.description'))
        .choices(['status', 'start', 'stop', 'help'])
        .default('help'))
        .addArgument(new commander_1.Argument('[name]', l.r('cli.cmd.queue.argument.name')).default(''))
        .action(async function (action, name) {
        if (!action) {
            this.outputHelp();
            return;
        }
        if (action === 'help') {
            this.outputHelp();
            return;
        }
        if (!enabled) {
            await (0, cmd_disabled_1.CommandDisabled)(ctx, 'queue');
            return;
        }
        if (action === 'status') {
            await (0, cmd_queue_1.QueueStatus)(ctx, name);
            return;
        }
        if (action === 'start') {
            await (0, cmd_queue_1.QueueStart)(ctx, name);
            return;
        }
        if (action === 'stop') {
            await (0, cmd_queue_1.QueueStop)(ctx, name);
            return;
        }
        this.outputHelp();
    });
}
//# sourceMappingURL=program.queue.js.map