import { CommandContext } from '@waha/apps/chatwoot/cli/types';
export declare function SessionRestart(ctx: CommandContext): Promise<void>;
export declare function SessionStart(ctx: CommandContext): Promise<void>;
export declare function SessionLogout(ctx: CommandContext): Promise<void>;
export declare function SessionStop(ctx: CommandContext): Promise<void>;
export declare function SessionStatus(ctx: CommandContext): Promise<void>;
export declare function SessionQR(ctx: CommandContext): Promise<void>;
export declare function SessionScreenshot(ctx: CommandContext): Promise<void>;
