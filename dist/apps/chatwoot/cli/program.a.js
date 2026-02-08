"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildProgram = BuildProgram;
const commander_1 = require("commander");
const help_1 = require("./utils/help");
const program_session_1 = require("./program.session");
const program_contacts_1 = require("./program.contacts");
const program_messages_1 = require("./program.messages");
const program_server_1 = require("./program.server");
const program_queue_1 = require("./program.queue");
function Program(ctx, output) {
    const l = ctx.l;
    const program = new commander_1.Command();
    program
        .name('')
        .description(l.r('cli.cmd.root.description'))
        .exitOverride()
        .configureOutput(output)
        .showSuggestionAfterError(true)
        .configureHelp({
        helpWidth: 200,
        styleOptionTerm(str) {
            return `- \`${str}\``;
        },
        styleArgumentTerm(str) {
            return `- **${str}**`;
        },
        styleUsage(str) {
            return `**${str}**`;
        },
        styleSubcommandTerm(str) {
            return `- **${str}**`;
        },
        styleSubcommandDescription(str) {
            return str ? `- ${str}` : str;
        },
        subcommandTerm: help_1.fullCommandPath,
        commandUsage(cmd) {
            if (!cmd.parent)
                return `${l.r('cli.usage.command')} ${l.r('cli.usage.options')}`;
            if (cmd.commands.length > 0) {
                return `${(0, help_1.fullCommandPath)(cmd)} ${l.r('cli.usage.command')} ${l.r('cli.usage.options')}`;
            }
            return `${(0, help_1.fullCommandPath)(cmd)} ${l.r('cli.usage.options')}`;
        },
        formatHelp: (0, help_1.buildFormatHelp)(l),
    });
    return program;
}
function BuildProgram(commands, ctx, output) {
    const program = Program(ctx, output);
    (0, program_session_1.AddSessionCommand)(program, ctx);
    (0, program_contacts_1.AddContactsCommand)(program, ctx);
    (0, program_messages_1.AddMessagesCommand)(program, ctx, commands.queue);
    (0, program_queue_1.AddQueueCommand)(program, ctx, commands.queue);
    (0, program_server_1.AddServerCommand)(program, ctx, commands.server);
    return program;
}
//# sourceMappingURL=program.a.js.map