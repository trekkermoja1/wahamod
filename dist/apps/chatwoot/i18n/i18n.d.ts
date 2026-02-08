import { Locale } from '@waha/apps/chatwoot/i18n/locale';
export declare class I18N {
    private readonly locales;
    constructor();
    available(): Array<{
        name: string;
        locale: string;
    }>;
    load(locales: Record<string, Record<string, string>>): void;
    add(locale: string, strings: Record<string, string>): void;
    locale(locale: string): Locale;
    has(locale: string): boolean;
}
