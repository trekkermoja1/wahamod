"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations = exports.NOWEB_STORE_SCHEMA = exports.NowebLidMapSchema = exports.NowebLabelAssociationsSchema = exports.NowebLabelsSchema = exports.NowebMessagesSchema = exports.NowebGroupsSchema = exports.NowebChatSchema = exports.NowebContactSchema = void 0;
const Schema_1 = require("../../../storage/Schema");
exports.NowebContactSchema = new Schema_1.Schema('contacts', [new Schema_1.Field('id', 'TEXT'), new Schema_1.Field('data', 'TEXT')], [new Schema_1.Index('contacts_id_index', ['id'])]);
exports.NowebChatSchema = new Schema_1.Schema('chats', [
    new Schema_1.Field('id', 'TEXT'),
    new Schema_1.Field('conversationTimestamp', 'INTEGER'),
    new Schema_1.Field('data', 'TEXT'),
], [
    new Schema_1.Index('chats_id_index', ['id']),
    new Schema_1.Index('chats_conversationTimestamp_index', ['conversationTimestamp']),
]);
exports.NowebGroupsSchema = new Schema_1.Schema('groups', [new Schema_1.Field('id', 'TEXT'), new Schema_1.Field('data', 'TEXT')], [new Schema_1.Index('groups_id_index', ['id'])]);
exports.NowebMessagesSchema = new Schema_1.Schema('messages', [
    new Schema_1.Field('jid', 'TEXT'),
    new Schema_1.Field('id', 'TEXT'),
    new Schema_1.Field('messageTimestamp', 'INTEGER'),
    new Schema_1.Field('data', 'TEXT'),
], [
    new Schema_1.Index('messages_id_index', ['id']),
    new Schema_1.Index('messages_jid_id_index', ['jid', 'id']),
    new Schema_1.Index('messages_jid_timestamp_index', ['jid', 'messageTimestamp']),
    new Schema_1.Index('timestamp_index', ['messageTimestamp']),
]);
exports.NowebLabelsSchema = new Schema_1.Schema('labels', [new Schema_1.Field('id', 'TEXT'), new Schema_1.Field('data', 'TEXT')], [new Schema_1.Index('labels_id_index', ['id'])]);
exports.NowebLabelAssociationsSchema = new Schema_1.Schema('labelAssociations', [
    new Schema_1.Field('id', 'TEXT'),
    new Schema_1.Field('type', 'TEXT'),
    new Schema_1.Field('labelId', 'TEXT'),
    new Schema_1.Field('chatId', 'TEXT'),
    new Schema_1.Field('messageId', 'TEXT'),
    new Schema_1.Field('data', 'TEXT'),
], [
    new Schema_1.Index('label_assoc_id_index', ['id']),
    new Schema_1.Index('label_assoc_type_label_index', ['type', 'labelId']),
    new Schema_1.Index('label_assoc_type_chat_index', ['type', 'chatId']),
    new Schema_1.Index('label_assoc_type_message_index', ['type', 'messageId']),
]);
exports.NowebLidMapSchema = new Schema_1.Schema('lid_map', [new Schema_1.Field('id', 'TEXT'), new Schema_1.Field('pn', 'TEXT'), new Schema_1.Field('data', 'TEXT')], [
    new Schema_1.Index('lid_map_id_index', ['id']),
    new Schema_1.Index('lid_map_pn_index', ['pn']),
]);
exports.NOWEB_STORE_SCHEMA = [
    exports.NowebContactSchema,
    exports.NowebChatSchema,
    exports.NowebGroupsSchema,
    exports.NowebMessagesSchema,
    exports.NowebLabelsSchema,
    exports.NowebLabelAssociationsSchema,
    exports.NowebLidMapSchema,
];
exports.Migrations = [
    'CREATE TABLE IF NOT EXISTS contacts (id TEXT PRIMARY KEY, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS contacts_id_index ON contacts (id)',
    'CREATE TABLE IF NOT EXISTS chats (id TEXT PRIMARY KEY, "conversationTimestamp" INTEGER, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS chats_id_index ON chats (id)',
    'CREATE INDEX IF NOT EXISTS "chats_conversationTimestamp_index" ON chats ("conversationTimestamp")',
    'CREATE TABLE IF NOT EXISTS groups (id TEXT PRIMARY KEY, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS groups_id_index ON groups (id)',
    'CREATE TABLE IF NOT EXISTS messages (jid TEXT, id TEXT, "messageTimestamp" INTEGER, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS messages_id_index ON messages (id)',
    'CREATE INDEX IF NOT EXISTS messages_jid_id_index ON messages (jid, id)',
    'CREATE INDEX IF NOT EXISTS messages_jid_timestamp_index ON messages (jid, "messageTimestamp")',
    'CREATE INDEX IF NOT EXISTS timestamp_index ON messages ("messageTimestamp")',
    'CREATE TABLE IF NOT EXISTS labels (id TEXT PRIMARY KEY, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS labels_id_index ON labels (id)',
    'CREATE TABLE IF NOT EXISTS "labelAssociations" (id TEXT PRIMARY KEY, type TEXT, "labelId" TEXT, "chatId" TEXT, "messageId" TEXT, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS label_assoc_id_index ON "labelAssociations" (id)',
    'CREATE INDEX IF NOT EXISTS label_assoc_type_label_index ON "labelAssociations" (type, "labelId")',
    'CREATE INDEX IF NOT EXISTS label_assoc_type_chat_index ON "labelAssociations" (type, "chatId")',
    'CREATE INDEX IF NOT EXISTS label_assoc_type_message_index ON "labelAssociations" (type, "messageId")',
    'CREATE TABLE IF NOT EXISTS lid_map (id TEXT PRIMARY KEY, pn TEXT, data TEXT)',
    'CREATE UNIQUE INDEX IF NOT EXISTS lid_map_id_index ON lid_map (id)',
    'CREATE INDEX IF NOT EXISTS lid_map_pn_index ON lid_map (pn)',
];
//# sourceMappingURL=schemas.js.map