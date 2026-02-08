import { ISessionMeRepository } from '@waha/core/storage/ISessionMeRepository';
import { LocalStore } from '@waha/core/storage/LocalStore';
import { Sqlite3KVRepository } from '@waha/core/storage/sqlite3/Sqlite3KVRepository';
import { MeInfo } from '@waha/structures/sessions.dto';
declare class SessionMeInfo {
    id: string;
    me?: MeInfo;
}
export declare class Sqlite3SessionMeRepository extends Sqlite3KVRepository<SessionMeInfo> implements ISessionMeRepository {
    get schema(): import("../Schema").Schema;
    get migrations(): string[];
    constructor(store: LocalStore);
    upsertMe(sessionName: string, me: MeInfo): Promise<void>;
    getMe(sessionName: string): Promise<MeInfo | null>;
    removeMe(sessionName: string): Promise<void>;
    protected validateSchema(): Promise<void>;
}
export {};
