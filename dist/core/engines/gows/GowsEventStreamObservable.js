"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GowsEventStreamObservable = void 0;
const grpc = require("@grpc/grpc-js");
const promiseTimeout_1 = require("../../../utils/promiseTimeout");
const rxjs_1 = require("rxjs");
const config_1 = require("../../auth/config");
class GowsEventStreamObservable extends rxjs_1.Observable {
    constructor(logger, factory) {
        super((subscriber) => {
            logger.debug('Creating grpc client and stream...');
            logger.setBindings({ id: (0, config_1.rand)() });
            const { client, stream } = factory();
            this._client = client;
            let closed = false;
            const cleanup = async (reason) => {
                if (closed) {
                    return;
                }
                closed = true;
                logger.debug({ reason }, 'Cancelling gRPC stream...');
                try {
                    stream.cancel();
                }
                catch (err) {
                    logger.warn({ err }, 'Failed to cancel gRPC stream');
                }
                logger.debug({ reason }, 'Closing gRPC client...');
                try {
                    client.close();
                }
                catch (err) {
                    logger.warn({ err }, 'Failed to close gRPC client');
                }
                await (0, promiseTimeout_1.sleep)(this.CLIENT_CLOSE_TIMEOUT);
            };
            stream.on('data', (raw) => {
                const obj = raw.toObject();
                obj.data = JSON.parse(obj.data);
                subscriber === null || subscriber === void 0 ? void 0 : subscriber.next(obj);
            });
            stream.on('end', (...args) => {
                logger.debug({ args }, 'Stream ended');
                subscriber === null || subscriber === void 0 ? void 0 : subscriber.complete();
                subscriber = null;
                void cleanup('end');
            });
            stream.on('error', async (err) => {
                const CLIENT_CANCELLED_CODE = grpc.status.CANCELLED;
                if (err.code === CLIENT_CANCELLED_CODE) {
                    logger.debug('Stream cancelled by client');
                    await cleanup('cancelled');
                    return;
                }
                logger.error({ err }, 'Stream error');
                await cleanup('error');
                await (0, promiseTimeout_1.sleep)(100);
                subscriber === null || subscriber === void 0 ? void 0 : subscriber.error(err);
                subscriber = null;
            });
            return async () => {
                await cleanup('teardown');
            };
        });
        this.CLIENT_CLOSE_TIMEOUT = 1000;
    }
    get client() {
        return this._client;
    }
}
exports.GowsEventStreamObservable = GowsEventStreamObservable;
//# sourceMappingURL=GowsEventStreamObservable.js.map