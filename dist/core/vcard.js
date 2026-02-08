"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toVcardV3 = toVcardV3;
exports.parseVCardV3 = parseVCardV3;
const ICAL = require("ical.js");
function toVcardV3(data) {
    if (data.vcard) {
        return data.vcard;
    }
    const contact = data;
    const parts = [];
    parts.push('BEGIN:VCARD');
    parts.push('VERSION:3.0');
    parts.push(`FN:${contact.fullName}`);
    if (contact.organization) {
        parts.push(`ORG:${contact.organization};`);
    }
    if (contact.whatsappId) {
        parts.push(`TEL;type=CELL;type=VOICE;waid=${contact.whatsappId}:${contact.phoneNumber}`);
    }
    else {
        parts.push(`TEL;type=CELL;type=VOICE:${contact.phoneNumber}`);
    }
    parts.push('END:VCARD');
    return parts.join('\n');
}
function parseVCardV3(vcardText) {
    const parsed = ICAL.parse(vcardText);
    const comp = new ICAL.Component(parsed);
    let fullName = comp.getFirstPropertyValue('fn');
    if (!fullName) {
        const n = comp.getFirstPropertyValue('n');
        if (n) {
            const [family, given, additional, prefix, suffix] = ('' + n).split(';');
            fullName = [prefix, given, additional, family, suffix]
                .filter(Boolean)
                .join(' ')
                .trim();
        }
    }
    const phoneNumbers = comp
        .getAllProperties('tel')
        .map((p) => { var _a; return String((_a = p.getFirstValue()) !== null && _a !== void 0 ? _a : ''); })
        .filter((n) => n.length > 0);
    return {
        fullName: fullName || '',
        phoneNumbers: phoneNumbers,
    };
}
//# sourceMappingURL=vcard.js.map