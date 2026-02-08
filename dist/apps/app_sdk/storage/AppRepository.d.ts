import { Knex } from 'knex';
import { App } from '../dto/app.dto';
import { AppDB } from './types';
export declare class AppRepository {
    private readonly knex;
    static tableName: string;
    constructor(knex: Knex);
    get tableName(): string;
    save(app: Omit<App, 'pk'>): Promise<AppDB>;
    private deserialize;
    private serialize;
    getById(id: string): Promise<AppDB | null>;
    findEnabledAppById(id: string): Promise<AppDB | null>;
    getAllBySession(session: string): Promise<AppDB[]>;
    getEnabledBySession(session: string): Promise<AppDB[]>;
    update(id: string, app: Partial<Omit<App, 'id'>>): Promise<void>;
    delete(id: string): Promise<void>;
    deleteBySession(session: string): Promise<void>;
}
