import Knex from 'knex';
export declare abstract class DataStore {
    abstract init(sessionName?: string): Promise<void>;
    abstract close(): Promise<any>;
    abstract getWAHADatabase(): Knex.Knex;
}
