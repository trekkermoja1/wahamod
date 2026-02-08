"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3Storage = void 0;
const Sqlite3GroupRepository_1 = require("./Sqlite3GroupRepository");
const Sqlite3LabelAssociationsRepository_1 = require("./Sqlite3LabelAssociationsRepository");
const Sqlite3LabelsRepository_1 = require("./Sqlite3LabelsRepository");
const Sqlite3LidPNRepository_1 = require("./Sqlite3LidPNRepository");
const knex_1 = require("knex");
const INowebStorage_1 = require("../INowebStorage");
const schemas_1 = require("../schemas");
const Sqlite3ChatRepository_1 = require("./Sqlite3ChatRepository");
const Sqlite3ContactRepository_1 = require("./Sqlite3ContactRepository");
const Sqlite3MessagesRepository_1 = require("./Sqlite3MessagesRepository");
const Sqlite3SchemaValidation_1 = require("./Sqlite3SchemaValidation");
const env_1 = require("../../../../env");
class Sqlite3Storage extends INowebStorage_1.INowebStorage {
    constructor(filePath) {
        super();
        this.knex = (0, knex_1.default)({
            client: env_1.KNEX_SQLITE_CLIENT,
            connection: { filename: filePath },
            useNullAsDefault: true,
            pool: {
                min: 1,
                max: 10,
                idleTimeoutMillis: 60000,
                createTimeoutMillis: 120000,
                acquireTimeoutMillis: 120000,
            },
        });
        this.tables = schemas_1.NOWEB_STORE_SCHEMA;
    }
    async init() {
        await this.knex.raw('PRAGMA journal_mode = WAL;');
        await this.migrate();
        await this.validateSchema();
    }
    async migrate() {
        await this.migration0001init();
    }
    async validateSchema() {
        for (const table of this.tables) {
            await new Sqlite3SchemaValidation_1.Sqlite3SchemaValidation(table, this.knex).validate();
        }
    }
    async migration0001init() {
        for (const migration of schemas_1.Migrations) {
            await this.knex.raw(migration);
        }
    }
    async close() {
        return this.knex.destroy();
    }
    getContactsRepository() {
        return new Sqlite3ContactRepository_1.Sqlite3ContactRepository(this.knex);
    }
    getChatRepository() {
        return new Sqlite3ChatRepository_1.Sqlite3ChatRepository(this.knex);
    }
    getGroupRepository() {
        return new Sqlite3GroupRepository_1.Sqlite3GroupRepository(this.knex);
    }
    getLabelsRepository() {
        return new Sqlite3LabelsRepository_1.Sqlite3LabelsRepository(this.knex);
    }
    getLabelAssociationRepository() {
        return new Sqlite3LabelAssociationsRepository_1.Sqlite3LabelAssociationsRepository(this.knex);
    }
    getMessagesRepository() {
        return new Sqlite3MessagesRepository_1.Sqlite3MessagesRepository(this.knex);
    }
    getLidPNRepository() {
        return new Sqlite3LidPNRepository_1.Sqlite3LidPNRepository(this.knex);
    }
}
exports.Sqlite3Storage = Sqlite3Storage;
//# sourceMappingURL=Sqlite3Storage.js.map