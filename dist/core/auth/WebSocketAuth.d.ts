import { IncomingMessage } from 'http';
import { IApiKeyAuth } from './auth';
export declare class WebSocketAuth {
    private auth;
    constructor(auth: IApiKeyAuth);
    validateRequest(request: IncomingMessage): boolean;
    private getKeyFromQueryParams;
}
