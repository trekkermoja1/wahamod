"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsExpress = void 0;
const fs = require("node:fs");
const chokidar = require('chokidar');
class HttpsExpress {
    constructor(logger) {
        this.logger = logger;
        this.keyPath = process.env.WAHA_HTTPS_PATH_KEY || './.secrets/privkey.pem';
        this.certPath = process.env.WAHA_HTTPS_PATH_CERT || './.secrets/cert.pem';
        this.caPath = process.env.WAHA_HTTPS_PATH_CA;
        if (this.caPath == null) {
            this.caPath = './.secrets/chain.pem';
        }
    }
    readSync() {
        this.logger.info('Reading HTTPS certificates...');
        this.logger.info(`HTTPS Key Path: ${this.keyPath}`);
        const key = fs.readFileSync(this.keyPath);
        this.logger.info(`HTTPS Cert Path: ${this.certPath}`);
        const cert = fs.readFileSync(this.certPath);
        this.logger.info(`HTTPS CA Path: ${this.caPath}`);
        const ca = this.caPath ? fs.readFileSync(this.caPath) : undefined;
        this.logger.info('HTTPS certificates read successfully');
        return { key: key, cert: cert, ca: ca };
    }
    watchCertChanges(httpd) {
        let waitForCertAndFullChainToGetUpdatedTooTimeout;
        const paths = [this.keyPath, this.certPath, this.caPath].filter((path) => !!path);
        const watcher = chokidar.watch(paths, {
            followSymlinks: false,
            persistent: true,
            ignoreInitial: true,
            disableGlobbing: true,
        });
        watcher.on('all', (eventName, path, stats) => {
            this.logger.info(`HTTPS file '${path}' has been '${eventName}'...`);
            clearTimeout(waitForCertAndFullChainToGetUpdatedTooTimeout);
            waitForCertAndFullChainToGetUpdatedTooTimeout = setTimeout(() => {
                this.logger.info('Updating HTTPS configuration...');
                httpd.setSecureContext(this.readSync());
            }, 1000);
        });
        process.on('SIGTERM', () => {
            this.logger.info('SIGTERM received, closing HTTP file watchers');
            clearTimeout(waitForCertAndFullChainToGetUpdatedTooTimeout);
            watcher.close();
        });
    }
}
exports.HttpsExpress = HttpsExpress;
//# sourceMappingURL=HttpsExpress.js.map