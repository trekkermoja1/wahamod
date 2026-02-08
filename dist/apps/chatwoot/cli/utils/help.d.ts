import { Command, Help } from 'commander';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
export declare function fullCommandPath(sub: Command): string;
export declare function buildFormatHelp(l: Locale): (this: Help, cmd: Command, helper: Help) => string;
