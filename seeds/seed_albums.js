const { FormatSrc } = require("../utils/utils");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("albums").del();
  await knex("albums").insert([
    {
      id: 1,
      name: "Celebration of the Persian New Year",
      date: "2016-04-10",
      src: FormatSrc("https://drive.google.com/drive/folders/1dkueudGCWtejNyR8J7GK_ZCIMJcIvtF2?usp=sharing"),
    },
    {
      id: 2,
      name: "The Role of An Architect in Green Buildings",
      date: "2016-11-17",
      src: FormatSrc("https://drive.google.com/drive/folders/1ZOpqOXnt8u6DdYDRJBsdtjRuxcavqU49?usp=sharing"),
    },
  ]);
};
