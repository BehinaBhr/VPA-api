/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("groups").del();
  await knex("groups").insert([
    { id: 1, name: "Organizations" },
    { id: 2, name: "Diversity and Inclusivity in Architecture" },
    { id: 3, name: "News in Architecture" },
  ]);
};
