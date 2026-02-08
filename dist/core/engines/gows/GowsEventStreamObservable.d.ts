import * as grpc from '@grpc/grpc-js';
import { messages } from '@waha/core/engines/gows/grpc/gows';
import { EnginePayload } from '@waha/structures/webhooks.dto';
import { Logger } from 'pino';
import { Observable } from 'rxjs';
export declare class GowsEventStreamObservable extends Observable<EnginePayload> {
    _client: grpc.Client;
    CLIENT_CLOSE_TIMEOUT: number;
    constructor(logger: Logger, factory: () => {
        client: grpc.Client;
        stream: grpc.ClientReadableStream<messages.EventJson>;
    });
    get client(): Omit<grpc.Client, 'close'>;
}
