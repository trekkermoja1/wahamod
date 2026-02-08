import { BufferedOutput } from '@waha/apps/chatwoot/cli/utils/BufferedOutput';
import { CommandContext } from '@waha/apps/chatwoot/cli/types';
import { ChatWootCommandsConfig } from '@waha/apps/chatwoot/dto/config.dto';
export declare function runText(commands: ChatWootCommandsConfig, ctx: CommandContext, text: string): Promise<BufferedOutput>;
export declare const CommandPrefix: string;
