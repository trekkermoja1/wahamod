import { CommandContext } from '@waha/apps/chatwoot/cli/types';
export declare function ServerStatus(ctx: CommandContext): Promise<void>;
export declare function ServerReboot(ctx: CommandContext, force: boolean): Promise<void>;
