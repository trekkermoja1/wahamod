import { EngineBootstrap } from '@waha/core/abc/EngineBootstrap';
import { Logger } from 'pino';
export declare function isUnixSocket(socketPath: string): Promise<boolean>;
export interface BootstrapConfig {
    path: string;
    socket: string;
    pprof?: boolean;
}
export declare class GowsBootstrap implements EngineBootstrap {
    private logger;
    private config;
    private gows;
    constructor(logger: Logger, config: BootstrapConfig);
    bootstrap(): Promise<void>;
    shutdown(): Promise<void>;
    checkSocket(path: string): Promise<void>;
}
