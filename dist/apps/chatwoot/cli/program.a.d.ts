import { ChatWootCommandsConfig } from '@waha/apps/chatwoot/dto/config.dto';
import { CommandContext } from '@waha/apps/chatwoot/cli/types';
import { Command, OutputConfiguration } from 'commander';
export declare function BuildProgram(commands: ChatWootCommandsConfig, ctx: CommandContext, output: OutputConfiguration): Command;
