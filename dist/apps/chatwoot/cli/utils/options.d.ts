import { Option } from 'commander';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
export declare function ParseMS(value: string): any;
export declare function ParseSeconds(value: string): number;
export declare class JobAttemptsOption extends Option {
    constructor(l: Locale, def: number);
}
export declare class JobTimeoutOption extends Option {
    constructor(l: Locale, def: string);
}
export declare function ProgressOption(description: string, def?: number): Option;
export declare function NotNegativeNumber(value: string): number;
export declare function PositiveNumber(value: string): number;
