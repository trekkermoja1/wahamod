"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandDisabled = CommandDisabled;
async function CommandDisabled(ctx, command) {
    const text = ctx.l.r('cli.cmd.disabled', { command: command });
    await ctx.conversation.incoming(text);
}
//# sourceMappingURL=cmd.disabled.js.map