"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRepository = void 0;
class AppRepository {
    constructor(knex) {
        this.knex = knex;
    }
    get tableName() {
        return AppRepository.tableName;
    }
    async save(app) {
        const appToSave = Object.assign({}, app);
        if (appToSave.config && typeof appToSave.config === 'object') {
            appToSave.config = JSON.stringify(appToSave.config);
        }
        const [pk] = await this.knex(this.tableName)
            .insert(appToSave)
            .returning('pk');
        return Object.assign(Object.assign({}, app), { pk: pk });
    }
    deserialize(app) {
        const parsedConfig = typeof app.config === 'string' ? JSON.parse(app.config) : app.config;
        let enabled;
        switch (app.enabled) {
            case undefined:
            case true:
            case 1:
            case '1':
                enabled = true;
                break;
            case false:
            case 0:
                enabled = false;
                break;
            default:
                enabled = true;
        }
        return Object.assign(Object.assign({}, app), { enabled: enabled, config: parsedConfig });
    }
    serialize(app) {
        const appCopy = Object.assign({}, app);
        if (appCopy.config && typeof appCopy.config === 'object') {
            appCopy.config = JSON.stringify(appCopy.config);
        }
        return appCopy;
    }
    async getById(id) {
        const app = await this.knex(this.tableName).where('id', id).first();
        if (!app) {
            return null;
        }
        return this.deserialize(app);
    }
    async findEnabledAppById(id) {
        const app = await this.knex(this.tableName)
            .where('id', id)
            .andWhere('enabled', true)
            .first();
        if (!app) {
            return null;
        }
        return this.deserialize(app);
    }
    async getAllBySession(session) {
        return this.knex(this.tableName)
            .select('*')
            .where('session', session)
            .orderBy('id', 'asc')
            .then((apps) => apps.map((app) => this.deserialize(app)));
    }
    async getEnabledBySession(session) {
        return this.knex(this.tableName)
            .select('*')
            .where('session', session)
            .andWhere('enabled', true)
            .orderBy('id', 'asc')
            .then((apps) => apps.map((app) => this.deserialize(app)));
    }
    async update(id, app) {
        const appToUpdate = this.serialize(app);
        if (appToUpdate.enabled === undefined) {
            delete appToUpdate.enabled;
        }
        await this.knex(this.tableName).where('id', id).update(appToUpdate);
    }
    async delete(id) {
        await this.knex(this.tableName).where('id', id).delete();
    }
    async deleteBySession(session) {
        await this.knex(this.tableName).where('session', session).delete();
    }
}
exports.AppRepository = AppRepository;
AppRepository.tableName = 'apps';
//# sourceMappingURL=AppRepository.js.map