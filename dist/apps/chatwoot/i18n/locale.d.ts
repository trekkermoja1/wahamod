import { TemplatePayloads, TKey } from '@waha/apps/chatwoot/i18n/templates';
import Long from 'long';
export declare class Locale {
    readonly strings: Record<string, string>;
    constructor(strings: Record<string, string>);
    get locale(): string;
    key<K extends TKey>(key: K): Template<K>;
    r<K extends TKey | string>(key: K, data?: TemplatePayloads[K]): string;
    override(strings: Record<string, string>): Locale;
    FormatCurrency(currency: string, value: number | null, offset?: number): string | null;
    FormatDatetime(date: Date | null, year: any): string | null;
    ParseTimestamp(timestamp: Long | string | number | null): Date | null;
    FormatTimestamp(timestamp: Long | string | number | null, year?: boolean): string | null;
    FormatDatetimeOpts(date: Date, options: Intl.DateTimeFormatOptions, year: boolean): string;
    FormatTimestampOpts(timestamp: Long | string | number | null, options: Intl.DateTimeFormatOptions, year?: boolean): string | null;
    FormatHumanDate(date: Date): string;
}
export declare class Template<K extends TKey> {
    private readonly template;
    constructor(template: string);
    render(data: TemplatePayloads[K]): string;
    r(data: TemplatePayloads[K]): string;
}
