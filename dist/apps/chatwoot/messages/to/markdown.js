"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedUrlText = exports.UrlProtection = void 0;
const DEFAULT_PLACEHOLDER_PREFIX = 'URLPLACEHOLDER';
const URL_REGEX = /https?:\/\/[^\s]+/g;
class UrlProtection {
    constructor(placeholder = DEFAULT_PLACEHOLDER_PREFIX) {
        this.placeholder = placeholder;
    }
    protect(text) {
        const urls = [];
        const result = text.replace(URL_REGEX, (url) => {
            const index = urls.length;
            urls.push(url);
            return `${this.placeholder}${index}`;
        });
        return new ProtectedUrlText(result, urls, this.placeholder);
    }
}
exports.UrlProtection = UrlProtection;
class ProtectedUrlText {
    constructor(text, urls, placeholder) {
        this.text = text;
        this.urls = urls;
        this.placeholder = placeholder;
    }
    restore(text = this.text) {
        return this.urls.reduce((acc, url, index) => {
            const placeholder = `${this.placeholder}${index}`;
            return acc.replace(placeholder, url);
        }, text);
    }
}
exports.ProtectedUrlText = ProtectedUrlText;
//# sourceMappingURL=markdown.js.map