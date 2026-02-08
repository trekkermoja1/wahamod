"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSessionCommand = AddSessionCommand;
const cms_session_1 = require("./cms.session");
function AddSessionCommand(program, ctx) {
    const l = ctx.l;
    const SessionGroup = l.r('cli.cmd.root.sub.session');
    program.commandsGroup(SessionGroup);
    program
        .command('status')
        .alias('1')
        .description(l.r('cli.cmd.session.status.description'))
        .helpGroup(SessionGroup)
        .action(() => (0, cms_session_1.SessionStatus)(ctx));
    program
        .command('restart')
        .alias('2')
        .description(l.r('cli.cmd.session.restart.description'))
        .helpGroup(SessionGroup)
        .action(() => (0, cms_session_1.SessionRestart)(ctx));
    program
        .command('start')
        .alias('3')
        .description(l.r('cli.cmd.session.start.description'))
        .helpGroup(SessionGroup)
        .action(() => (0, cms_session_1.SessionStart)(ctx));
    program
        .command('stop')
        .alias('4')
        .description(l.r('cli.cmd.session.stop.description'))
        .helpGroup(SessionGroup)
        .action(() => (0, cms_session_1.SessionStop)(ctx));
    program
        .command('logout')
        .alias('5')
        .description(l.r('cli.cmd.session.logout.description'))
        .helpGroup(SessionGroup)
        .action(() => (0, cms_session_1.SessionLogout)(ctx));
    program
        .command('qr')
        .alias('6')
        .description(l.r('cli.cmd.session.qr.description'))
        .helpGroup(SessionGroup)
        .action(() => (0, cms_session_1.SessionQR)(ctx));
    program
        .command('screenshot')
        .alias('7')
        .description(l.r('cli.cmd.session.screenshot.description'))
        .helpGroup(SessionGroup)
        .action(() => (0, cms_session_1.SessionScreenshot)(ctx));
}
//# sourceMappingURL=program.session.js.map