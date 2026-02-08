"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exposeFunctionIfAbsent = exposeFunctionIfAbsent;
async function exposeFunctionIfAbsent(page, name, fn) {
    const exist = await page.evaluate((name) => {
        return !!window[name];
    }, name);
    if (exist) {
        return;
    }
    await page.exposeFunction(name, fn);
}
//# sourceMappingURL=Puppeteer.js.map