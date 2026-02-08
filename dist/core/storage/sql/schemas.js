"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLSessionWorkerMigrations = exports.SQLSessionWorkerSchema = exports.SQLMeMigrations = exports.SQLMeSchema = exports.SQLSessionConfigMigrations = exports.SQLSessionConfigSchema = void 0;
const Schema_1 = require("../Schema");
exports.SQLSessionConfigSchema = new Schema_1.Schema('session_config', [new Schema_1.Field('id', 'TEXT'), new Schema_1.Field('data', 'TEXT')], [new Schema_1.Index('session_config_id_index', ['id'])]);
exports.SQLSessionConfigMigrations = [
    'CREATE TABLE IF NOT EXISTS session_config (id TEXT PRIMARY KEY, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS session_config_id_index ON session_config (id)',
];
exports.SQLMeSchema = new Schema_1.Schema('me', [new Schema_1.Field('id', 'TEXT'), new Schema_1.Field('data', 'TEXT')], [new Schema_1.Index('me_id_index', ['id'])]);
exports.SQLMeMigrations = [
    'CREATE TABLE IF NOT EXISTS me (id TEXT PRIMARY KEY, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS me_id_index ON me (id)',
];
exports.SQLSessionWorkerSchema = new Schema_1.Schema('session_worker', [
    new Schema_1.Field('id', 'TEXT'),
    new Schema_1.Field('worker', 'TEXT'),
    new Schema_1.Field('data', 'TEXT'),
], [
    new Schema_1.Index('session_worker_id_idx', ['id']),
    new Schema_1.Index('session_worker_worker_idx', ['worker']),
]);
exports.SQLSessionWorkerMigrations = [
    'CREATE TABLE IF NOT EXISTS session_worker (id TEXT, worker TEXT, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS session_worker_id_idx ON session_worker (id)',
    'CREATE INDEX IF NOT EXISTS session_worker_worker_idx ON session_worker (worker)',
];
//# sourceMappingURL=schemas.js.map