import { DataStore } from '../../../abc/DataStore';
import { INowebStorage } from './INowebStorage';
export declare class NowebStorageFactoryCore {
    createStorage(store: DataStore, name: string): INowebStorage;
    private buildStorageSqlite3;
}
