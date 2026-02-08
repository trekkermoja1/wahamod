"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownToWhatsApp = MarkdownToWhatsApp;
function MarkdownToWhatsApp(text) {
    if (!text) {
        return '';
    }
    return (text
        .replace(/```([\s\S]*?)```/g, '```$1```')
        .replace(/(?<!\*)\*(?!\*)(.*?)\*(?!\*)|(?<!_)_(?!_)(.*?)_(?!_)/g, (_m, a, b) => `_${a || b}_`)
        .replace(/\*\*(.*?)\*\*/g, '*$1*')
        .replace(/~~(.*?)~~/g, '~$1~')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)')
        .replace(/^[-+*] (.*)/gm, '* $1'));
}
//# sourceMappingURL=markdown.js.map