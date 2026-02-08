"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddServerCommand = AddServerCommand;
const cmd_disabled_1 = require("./cmd.disabled");
const cmd_server_1 = require("./cmd.server");
function AddServerCommand(program, ctx, enabled) {
    const l = ctx.l;
    const ServerGroup = l.r('cli.cmd.root.sub.server');
    program.commandsGroup(ServerGroup);
    const server = program
        .command('server', { hidden: !enabled })
        .description(l.r('cli.cmd.server.description'))
        .helpGroup(ServerGroup);
    if (!enabled) {
        server.action(() => (0, cmd_disabled_1.CommandDisabled)(ctx, 'server'));
    }
    server
        .command('status')
        .description(l.r('cli.cmd.server.status.description'))
        .action(() => enabled ? (0, cmd_server_1.ServerStatus)(ctx) : (0, cmd_disabled_1.CommandDisabled)(ctx, 'server status'));
    server
        .command('reboot')
        .description(l.r('cli.cmd.server.reboot.description'))
        .option('-f, --force', l.r('cli.cmd.server.reboot.option.force'), false)
        .action((opts) => enabled
        ? (0, cmd_server_1.ServerReboot)(ctx, opts.force)
        : (0, cmd_disabled_1.CommandDisabled)(ctx, 'server reboot'));
}
//# sourceMappingURL=program.server.js.map