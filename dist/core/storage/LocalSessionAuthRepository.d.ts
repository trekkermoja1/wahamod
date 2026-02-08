import { ISessionAuthRepository } from './ISessionAuthRepository';
import { LocalStore } from './LocalStore';
export declare class LocalSessionAuthRepository extends ISessionAuthRepository {
    private store;
    constructor(store: LocalStore);
    init(sessionName?: string): Promise<void>;
    clean(sessionName: string): Promise<void>;
}
