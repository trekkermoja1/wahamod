import { ISessionWorkerRepository, SessionWorkerInfo } from '@waha/core/storage/ISessionWorkerRepository';
import { LocalStore } from '@waha/core/storage/LocalStore';
import { Sqlite3KVRepository } from '@waha/core/storage/sqlite3/Sqlite3KVRepository';
export declare class Sqlite3SessionWorkerRepository extends Sqlite3KVRepository<SessionWorkerInfo> implements ISessionWorkerRepository {
    get schema(): import("../Schema").Schema;
    get migrations(): string[];
    constructor(store: LocalStore);
    assign(session: string, worker: string): Promise<void>;
    unassign(session: string, worker: string): Promise<void>;
    remove(session: string): Promise<void>;
    getSessionsByWorker(worker: string): Promise<string[]>;
    protected validateSchema(): Promise<void>;
}
