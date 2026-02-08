"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18N = void 0;
const locale_1 = require("./locale");
const templates_1 = require("./templates");
class I18N {
    constructor() {
        this.locales = {};
    }
    available() {
        const result = [];
        for (const [key, template] of Object.entries(this.locales)) {
            result.push({ locale: key, name: template.key(templates_1.TKey.LOCALE_NAME).r() });
        }
        return result;
    }
    load(locales) {
        for (const [locale, strings] of Object.entries(locales)) {
            this.add(locale, strings);
        }
    }
    add(locale, strings) {
        if (!this.locales[locale]) {
            this.locales[locale] = new locale_1.Locale(strings);
        }
        else {
            this.locales[locale] = this.locales[locale].override(strings);
        }
    }
    locale(locale) {
        if (!this.has(locale)) {
            throw new Error(`Locale ${locale} not found`);
        }
        return this.locales[locale];
    }
    has(locale) {
        return !!this.locales[locale];
    }
}
exports.I18N = I18N;
//# sourceMappingURL=i18n.js.map