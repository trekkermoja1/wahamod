"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QR = void 0;
const QRCode = require('qrcode');
class QR {
    save(raw) {
        this.raw = raw;
    }
    async get() {
        const url = await QRCode.toDataURL(this.raw);
        const base64 = url.replace(/^data:image\/png;base64,/, '');
        return Buffer.from(base64, 'base64');
    }
}
exports.QR = QR;
//# sourceMappingURL=QR.js.map