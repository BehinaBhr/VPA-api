/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function (knex) {
    return knex.schema.createTable("albums", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.date("date").notNullable();
      table.string("src").notNullable();
    });
   };
   
   
   /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   exports.down = function (knex) {
    return knex.schema.dropTable("albums");
   };
   
