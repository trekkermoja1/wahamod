"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = async function (knex) {
    const hasColumn = await knex.schema.hasColumn('apps', 'enabled');
    if (!hasColumn) {
        await knex.schema.alterTable('apps', (table) => {
            table.boolean('enabled').defaultTo(true);
        });
        await knex('apps').update({ enabled: true });
        await knex.schema.alterTable('apps', (table) => {
            table.boolean('enabled').notNullable().defaultTo(true).alter();
        });
    }
};
exports.down = async function (knex) {
    const hasColumn = await knex.schema.hasColumn('apps', 'enabled');
    if (hasColumn) {
        await knex.schema.alterTable('apps', (table) => {
            table.dropColumn('enabled');
        });
    }
};
//# sourceMappingURL=002_add_enabled_to_apps.js.map