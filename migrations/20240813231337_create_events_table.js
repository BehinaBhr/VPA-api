/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("title").notNullable();
    table.date("date").notNullable();
    table.string("time").notNullable();
    table.string("location").notNullable();
    table.string("topic");
    table.string("host");
    table.string("additional_info");
    table.decimal("fee", 8, 2);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
