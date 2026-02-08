"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStatus = ServerStatus;
exports.ServerReboot = ServerReboot;
const templates_1 = require("../i18n/templates");
async function ServerStatus(ctx) {
    ctx.logger.info('Getting server version and status');
    const version = await ctx.waha.serverVersion();
    const status = await ctx.waha.serverStatus();
    const text = ctx.l.key(templates_1.TKey.APP_SERVER_VERSION_AND_STATUS).render({
        version: JSON.stringify(version, null, 2),
        status: JSON.stringify(status, null, 2),
    });
    await ctx.conversation.incoming(text);
}
async function ServerReboot(ctx, force) {
    const type = force ? 'force' : 'graceful';
    const tkey = force ? templates_1.TKey.APP_SERVER_REBOOT_FORCE : templates_1.TKey.APP_SERVER_REBOOT;
    ctx.logger.info(`Rebooting server (${type})`);
    const text = ctx.l.key(tkey).render();
    await ctx.conversation.incoming(text);
    await ctx.waha.serverReboot(false);
}
//# sourceMappingURL=cmd.server.js.map