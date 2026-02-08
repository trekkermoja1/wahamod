"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddContactsCommand = AddContactsCommand;
const commander_1 = require("commander");
const options_1 = require("./utils/options");
const cmd_contacts_1 = require("./cmd.contacts");
function AddContactsCommand(program, ctx) {
    const l = ctx.l;
    const SyncGroup = l.r('cli.cmd.root.sub.sync');
    program.commandsGroup(SyncGroup);
    program
        .command('contacts')
        .summary(l.r('cli.cmd.contacts.summary'))
        .description(l.r('cli.cmd.contacts.description'))
        .helpGroup(SyncGroup)
        .addArgument(new commander_1.Argument('[action]', l.r('cli.cmd.contacts.action.description')).choices(['pull', 'status', 'help']))
        .addOption(new commander_1.Option('-a, --avatar <mode>', l.r('cli.cmd.contacts.pull.option.avatar'))
        .choices(['if-missing', 'update'])
        .preset('if-missing'))
        .option('-g, --groups', l.r('cli.cmd.contacts.pull.option.groups'))
        .option('-l, --lids', l.r('cli.cmd.contacts.pull.option.lids'))
        .option('--na, --no-attributes', l.r('cli.cmd.contacts.pull.option.no-attributes'))
        .option('-b, --batch <number>', l.r('cli.cmd.contacts.pull.option.batch'), options_1.NotNegativeNumber, 100)
        .addOption((0, options_1.ProgressOption)(l.r('cli.cmd.contacts.pull.option.progress'), 100))
        .addOption(new options_1.JobAttemptsOption(l, 6))
        .addOption(new options_1.JobTimeoutOption(l, '10m'))
        .addOption(new commander_1.Option('--dc, --delay-contact <duration>', l.r('cli.cmd.contacts.pull.option.delay-contact'))
        .argParser(options_1.ParseMS)
        .default((0, options_1.ParseMS)('0.1s'), '0.1s'))
        .addOption(new commander_1.Option('--db, --delay-batch <duration>', l.r('cli.cmd.contacts.pull.option.delay-batch'))
        .argParser(options_1.ParseMS)
        .default((0, options_1.ParseMS)('1s'), '1s'))
        .action(async (action, opts, cmd) => {
        if (!action) {
            cmd.outputHelp();
            return;
        }
        if (action === 'help') {
            cmd.outputHelp();
            return;
        }
        if (action === 'status') {
            await (0, cmd_contacts_1.ContactsPullStatus)(ctx);
            return;
        }
        const options = {
            batch: opts.batch,
            progress: opts.progress,
            avatar: opts.avatar,
            attributes: opts.attributes,
            contacts: {
                lids: opts.lids,
                groups: opts.groups,
            },
            delay: {
                contact: opts.delayContact,
                batch: opts.delayBatch,
            },
        };
        const jobOptions = {
            attempts: opts.attempts,
            timeout: {
                job: opts.timeout,
            },
        };
        await (0, cmd_contacts_1.ContactsPullStart)(ctx, options, jobOptions);
    });
}
//# sourceMappingURL=program.contacts.js.map