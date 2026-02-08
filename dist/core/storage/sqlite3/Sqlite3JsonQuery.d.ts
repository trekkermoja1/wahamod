import { IJsonQuery } from '@waha/core/storage/sql/IJsonQuery';
export declare class Sqlite3JsonQuery implements IJsonQuery {
    filter(field: string, key: string, value: any): [string, string];
    sortBy(field: string, sortBy: string, direction: string): string;
}
