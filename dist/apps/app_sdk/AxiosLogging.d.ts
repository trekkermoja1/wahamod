import { AxiosInstance } from 'axios';
import { ILogger } from './ILogger';
export declare class AxiosLogging {
    private readonly logger;
    constructor(logger: ILogger);
    applyTo(instance: AxiosInstance): void;
    private onRequest;
    private onResponse;
    private onError;
}
