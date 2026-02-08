"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMessagesCommand = AddMessagesCommand;
const commander_1 = require("commander");
const options_1 = require("./utils/options");
const cmd_messages_1 = require("./cmd.messages");
function AddMessagesCommand(program, ctx, queue) {
    const l = ctx.l;
    const SyncGroup = l.r('cli.cmd.root.sub.sync');
    program.commandsGroup(SyncGroup);
    program
        .command('messages')
        .summary(l.r('cli.cmd.messages.summary'))
        .description(l.r('cli.cmd.messages.description'))
        .helpGroup(SyncGroup)
        .addArgument(new commander_1.Argument('[action]', l.r('cli.cmd.messages.action.description')).choices(['pull', 'status', 'help']))
        .addArgument(new commander_1.Argument('[end]', l.r('cli.cmd.messages.pull.argument.end'))
        .argParser(options_1.ParseMS)
        .default((0, options_1.ParseMS)('1d'), '1d'))
        .addArgument(new commander_1.Argument('[start]', l.r('cli.cmd.messages.pull.argument.start'))
        .argParser(options_1.ParseMS)
        .default((0, options_1.ParseMS)('0d'), '0d'))
        .option('-c, --chat <chat>', l.r('cli.cmd.messages.pull.option.chat'), 'all')
        .option('-f, --force', l.r('cli.cmd.messages.pull.option.force'))
        .option('--nd, --no-dm', l.r('cli.cmd.messages.pull.option.no-dm'))
        .option('-g, --groups', l.r('cli.cmd.messages.pull.option.groups'))
        .option('--ch, --channels', l.r('cli.cmd.messages.pull.option.channels'))
        .option('-s, --status', l.r('cli.cmd.messages.pull.option.status'))
        .option('--bc, --broadcast', l.r('cli.cmd.messages.pull.option.broadcast'))
        .option('-m, --media', l.r('cli.cmd.messages.pull.option.media'))
        .option('--pause', l.r('cli.cmd.messages.pull.option.pause'))
        .option('--rc, --resolve-conversations', l.r('cli.cmd.messages.pull.option.resolve-conversations'))
        .option('-b, --batch <number>', l.r('cli.cmd.messages.pull.option.batch'), options_1.NotNegativeNumber, 100)
        .addOption((0, options_1.ProgressOption)(l.r('cli.cmd.messages.pull.option.progress')))
        .addOption(new options_1.JobAttemptsOption(l, 6))
        .addOption(new options_1.JobTimeoutOption(l, '10m'))
        .addOption(new commander_1.Option('--tm, --timeout-media <duration>', l.r('cli.cmd.messages.pull.option.timeout-media'))
        .argParser(options_1.ParseMS)
        .default((0, options_1.ParseMS)('30s'), '30s'))
        .action(async (action, end, start, opts, cmd) => {
        if (!action) {
            cmd.outputHelp();
            return;
        }
        if (action === 'help') {
            cmd.outputHelp();
            return;
        }
        if (action === 'status') {
            await (0, cmd_messages_1.MessagesPullStatus)(ctx);
            return;
        }
        if (end > start) {
            const tmp = end;
            end = start;
            start = tmp;
        }
        if (opts.pause && !queue) {
            await ctx.conversation.incoming(l.r('cli.cmd.messages.pull.error.pause-no-queue'));
            return;
        }
        const options = {
            chat: opts.chat,
            progress: opts.progress,
            period: {
                end: end,
                start: start,
            },
            media: opts.media,
            force: opts.force,
            pause: opts.pause,
            timeout: {
                media: opts.timeoutMedia,
            },
            batch: opts.batch,
            ignore: {
                dm: !opts.dm,
                status: !opts.status,
                groups: !opts.groups,
                channels: !opts.channels,
                broadcast: !opts.broadcast,
            },
            resolveConversations: opts.resolveConversations,
        };
        const jobOptions = {
            attempts: opts.attempts,
            timeout: {
                job: opts.timeout,
            },
        };
        await (0, cmd_messages_1.MessagesPullStart)(ctx, options, jobOptions);
    });
}
//# sourceMappingURL=program.messages.js.map