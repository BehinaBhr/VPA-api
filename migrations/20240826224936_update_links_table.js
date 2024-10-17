/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("links", function (table) {
    table.dropColumn("group_name");
    table.integer("group_id").unsigned().references("groups.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("links", function (table) {
    table.dropColumn("group_id");
    table.string("group_name").notNullable();
  });
};
