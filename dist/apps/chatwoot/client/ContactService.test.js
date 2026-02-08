"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContactService_1 = require("./ContactService");
describe('sanitizeName', () => {
    it('should return the same name', () => {
        const name = 'John Doe';
        expect((0, ContactService_1.sanitizeName)(name)).toBe(name);
    });
    it('should return 254 symbols max', () => {
        const name = 'a'.repeat(300);
        expect((0, ContactService_1.sanitizeName)(name)).toBe('a'.repeat(255));
    });
    it('should remove bidi characters and trim the name', () => {
        const name = '‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪‏‪+123123‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏‬‏';
        expect((0, ContactService_1.sanitizeName)(name)).toBe('+123123');
    });
    it('should not remove bidi characters if within limit', () => {
        const name = 'محمد +123';
        expect((0, ContactService_1.sanitizeName)(name)).toBe(name);
    });
});
//# sourceMappingURL=ContactService.test.js.map