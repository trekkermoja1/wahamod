"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhoneJidNormalizer_1 = require("./PhoneJidNormalizer");
describe('E164Parser.fromJid', () => {
    it('parses basic JID to +number', () => {
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('14155552671@s.whatsapp.net')).toBe('+14155552671');
    });
    it('parses basic JID @c.us to +number', () => {
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('14155552671@c.us')).toBe('+14155552671');
    });
    it('parses JID with device id +number', () => {
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('14155552671:123@c.us')).toBe('+14155552671');
    });
    it('returns null for empty or missing local part', () => {
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('')).toBeNull();
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('@s.whatsapp.net')).toBeNull();
    });
    it('applies Brazil add-9 rule when local has 8 digits (any first digit)', () => {
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('553188888888@s.whatsapp.net')).toBe('+5531988888888');
    });
    it('554999111111 => 5549999111111', () => {
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('554999111111@s.whatsapp.net')).toBe('+5549999111111');
    });
    it('adds 9 even when local already starts with 9 (Brazil)', () => {
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('553198888888@s.whatsapp.net')).toBe('+5531998888888');
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('553199999999@s.whatsapp.net')).toBe('+5531999999999');
    });
    it('leaves non-Brazil numbers unchanged', () => {
        expect(PhoneJidNormalizer_1.E164Parser.fromJid('447911123456@s.whatsapp.net')).toBe('+447911123456');
    });
});
//# sourceMappingURL=PhoneJidNormalizer.test.js.map