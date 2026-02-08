export declare class EnvironmentQuery {
    all: boolean;
}
export declare class StopRequest {
    force: boolean;
}
export declare class StopResponse {
    stopping: boolean;
}
export declare class WorkerInfo {
    id: string;
}
export declare class ServerStatusResponse {
    startTimestamp: number;
    uptime: number;
    worker: WorkerInfo;
}
