import { DataStore } from '@waha/core/abc/DataStore';
import { LocalStore } from '@waha/core/storage/LocalStore';
import { GowsAuth } from './GowsAuth';
export declare class GowsAuthFactoryCore {
    buildAuth(store: DataStore, name: string): Promise<GowsAuth>;
    protected buildSqlite3(store: LocalStore, name: string): Promise<GowsAuth>;
}
