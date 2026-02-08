export declare class SessionWorkerInfo {
    id: string;
    worker: string;
}
export declare abstract class ISessionWorkerRepository {
    abstract assign(session: string, worker: string): Promise<void>;
    abstract unassign(session: string, worker: string): Promise<void>;
    abstract remove(session: string): Promise<void>;
    abstract getAll(): Promise<SessionWorkerInfo[]>;
    abstract getSessionsByWorker(worker: string): Promise<string[]>;
    abstract init(): Promise<void>;
}
