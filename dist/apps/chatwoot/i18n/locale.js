"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = exports.Locale = void 0;
const Mustache = require("mustache");
const lodash = require("lodash");
const utils_1 = require("../../../core/engines/noweb/utils");
const timehelper_1 = require("../../../utils/timehelper");
const env_1 = require("../env");
const datehelper_1 = require("../../../utils/datehelper");
class Locale {
    constructor(strings) {
        this.strings = strings;
    }
    get locale() {
        return this.strings['locale.base'] || 'en';
    }
    key(key) {
        return new Template(this.strings[key] || key);
    }
    r(key, data = null) {
        const template = this.key(key);
        return template.render(data);
    }
    override(strings) {
        return new Locale(Object.assign(Object.assign({}, this.strings), strings));
    }
    FormatCurrency(currency, value, offset = 1) {
        if (value == null) {
            return null;
        }
        if (!currency) {
            return null;
        }
        offset = offset || 1;
        try {
            const fmt = new Intl.NumberFormat(this.locale, {
                style: 'currency',
                currency: currency,
            });
            return fmt.format(value / offset);
        }
        catch (err) {
            return `${currency} ${value}`;
        }
    }
    FormatDatetime(date, year) {
        const options = lodash.clone(this.strings['datetime'] || {});
        return this.FormatDatetimeOpts(date, options, year);
    }
    ParseTimestamp(timestamp) {
        const value = (0, utils_1.ensureNumber)(timestamp);
        if (!value) {
            return undefined;
        }
        if (!Number.isFinite(value)) {
            return undefined;
        }
        const milliseconds = (0, timehelper_1.EnsureMilliseconds)(value);
        const date = new Date(milliseconds);
        if (Number.isNaN(date.getTime())) {
            return undefined;
        }
        return date;
    }
    FormatTimestamp(timestamp, year = true) {
        const date = this.ParseTimestamp(timestamp);
        return this.FormatDatetime(date, year);
    }
    FormatDatetimeOpts(date, options, year) {
        options = lodash.cloneDeep(options);
        if (!date) {
            return null;
        }
        const opts = this.strings['datetime'] || {};
        options.timeZone = opts.timeZone || opts.timezone || env_1.TZ;
        if (!year && date.getFullYear() === new Date().getFullYear()) {
            options.year = undefined;
        }
        return date.toLocaleDateString(this.locale, options);
    }
    FormatTimestampOpts(timestamp, options, year = true) {
        const date = this.ParseTimestamp(timestamp);
        return this.FormatDatetimeOpts(date, options, year);
    }
    FormatHumanDate(date) {
        const options = lodash.clone(this.strings['datetime'] || {});
        const now = new Date();
        const today = (0, datehelper_1.isToday)(date, now);
        const yesterday = (0, datehelper_1.isYesterday)(date, now);
        const sameYear = (0, datehelper_1.isSameYear)(date, now);
        const dateOptions = Object.assign(Object.assign({}, options), { hour: undefined, minute: undefined, second: undefined, timeZoneName: undefined, year: sameYear ? undefined : options.year, weekday: today || yesterday ? undefined : options.weekday });
        const timeOptions = Object.assign(Object.assign({}, options), { year: undefined, month: undefined, day: undefined, weekday: undefined });
        const dateStr = date.toLocaleDateString(this.locale, dateOptions);
        const timeStr = date.toLocaleTimeString(this.locale, timeOptions);
        if (today) {
            const todayLabel = this.r('Today');
            return `${todayLabel}, ${dateStr} • ${timeStr}`;
        }
        if (yesterday) {
            const yesterdayLabel = this.r('Yesterday');
            return `${yesterdayLabel}, ${dateStr} • ${timeStr}`;
        }
        return `${dateStr} • ${timeStr}`;
    }
}
exports.Locale = Locale;
class Template {
    constructor(template) {
        this.template = template;
    }
    render(data) {
        const text = Mustache.render(this.template, data);
        return text.replace(/\n$/, '');
    }
    r(data) {
        return this.render(data);
    }
}
exports.Template = Template;
//# sourceMappingURL=locale.js.map