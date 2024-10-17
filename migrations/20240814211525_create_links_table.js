/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("links", (table) => {
    table.increments("id").primary();
    table.string("group_name").notNullable();
    table.string("href").notNullable();
    table.string("title").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("links");
};
