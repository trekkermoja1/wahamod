"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappToMarkdown = WhatsappToMarkdown;
const markdown_1 = require("../../markdown");
const boldPattern = new RegExp(`(?<![\\p{L}\\p{N}_*])\\*(?!\\*)(?=\\S)(.+?)(?<=\\S)\\*(?![\\p{L}\\p{N}_*])`, 'gu');
const italicPattern = new RegExp(`(?<![\\p{L}\\p{N}_])_(?!_)(?=\\S)(.+?)(?<=\\S)_(?![\\p{L}\\p{N}_])`, 'gu');
const strikePattern = new RegExp(`(?<![\\p{L}\\p{N}_~])~(?!~)(?=\\S)(.+?)(?<=\\S)~(?![\\p{L}\\p{N}_~])`, 'gu');
function WhatsappToMarkdown(text) {
    if (!text) {
        return text;
    }
    if (text == '') {
        return '';
    }
    const protection = new markdown_1.UrlProtection();
    const urls = protection.protect(text);
    text = urls.text;
    let result = text
        .replace(boldPattern, '**$1**')
        .replace(strikePattern, '~~$1~~')
        .replace(italicPattern, '*$1*');
    result = urls.restore(result);
    return result;
}
//# sourceMappingURL=markdown.js.map