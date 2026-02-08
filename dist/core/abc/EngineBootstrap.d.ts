export interface EngineBootstrap {
    bootstrap(): Promise<void>;
    shutdown(): Promise<void>;
}
export declare class NoopEngineBootstrap implements EngineBootstrap {
    bootstrap(): Promise<void>;
    shutdown(): Promise<void>;
}
