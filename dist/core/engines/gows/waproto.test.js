"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const waproto_1 = require("./waproto");
describe('camelCaseKeysDeep', () => {
    it('URL to url', () => {
        const input = { URL: 'https://example.com/image.png' };
        const result = (0, waproto_1.camelCaseKeysDeep)(input);
        expect(result).toEqual({
            url: 'https://example.com/image.png',
        });
    });
    it('converts originalImageURL to originalImageUrl', () => {
        const input = { originalImageURL: 'https://example.com/image.png' };
        const result = (0, waproto_1.camelCaseKeysDeep)(input);
        expect(result).toEqual({
            originalImageUrl: 'https://example.com/image.png',
        });
    });
    it('keeps externalAdReply as externalAdReply', () => {
        const input = { externalAdReply: { title: 'Sample' } };
        const result = (0, waproto_1.camelCaseKeysDeep)(input);
        expect(result).toEqual({ externalAdReply: { title: 'Sample' } });
    });
    it('converts PascalCase keys to pascalCase', () => {
        const input = { PascalCase: 'value' };
        const result = (0, waproto_1.camelCaseKeysDeep)(input);
        expect(result).toEqual({ pascalCase: 'value' });
    });
    it('camel cases keys nested inside arrays while keeping primitive entries intact', () => {
        const input = [
            { MixedCaseKey: 'value', inner_object: { AnotherNestedKey: 42 } },
            'STRING_VALUE',
            10,
        ];
        const result = (0, waproto_1.camelCaseKeysDeep)(input);
        expect(result).toEqual([
            { mixedCaseKey: 'value', innerObject: { anotherNestedKey: 42 } },
            'STRING_VALUE',
            10,
        ]);
    });
});
//# sourceMappingURL=waproto.test.js.map