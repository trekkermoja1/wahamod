"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E164Parser = exports.PhoneJidNormalizer = void 0;
const jids_1 = require("./jids");
class PhoneJidNormalizer {
    constructor(rules = []) {
        this.rules = rules;
    }
    parseFromJid(jid) {
        var _a;
        if (!jid) {
            return null;
        }
        jid = (0, jids_1.normalizeJid)(jid);
        const local = (_a = jid.split('@', 1)[0]) !== null && _a !== void 0 ? _a : '';
        if (!local) {
            return null;
        }
        return `+${local}`;
    }
    rewrite(number) {
        for (const rule of this.rules) {
            if (rule.re.test(number)) {
                number = number.replace(rule.re, rule.replace);
                return number;
            }
        }
        return number;
    }
    fromJid(jid) {
        let number = this.parseFromJid(jid);
        if (!number) {
            return null;
        }
        number = this.rewrite(number);
        return number;
    }
}
exports.PhoneJidNormalizer = PhoneJidNormalizer;
const RULES = [
    {
        name: 'br-add-9-after-ddd',
        re: /^\+55(\d{2})(\d{8})$/,
        replace: '+55$19$2',
    },
];
exports.E164Parser = new PhoneJidNormalizer(RULES);
//# sourceMappingURL=PhoneJidNormalizer.js.map