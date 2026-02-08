"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBuffer = fetchBuffer;
const axios_1 = require("axios");
const https_1 = require("https");
const InsecureHttpsAgent = new https_1.Agent({
    rejectUnauthorized: false,
});
async function fetchBuffer(url) {
    return axios_1.default
        .get(url, {
        responseType: 'arraybuffer',
        httpsAgent: InsecureHttpsAgent,
    })
        .then((res) => {
        return Buffer.from(res.data);
    });
}
//# sourceMappingURL=fetch.js.map