const knex = require("knex")(require("../knexfile"));

const validateLinkFields = async (req, update = false) => {
  // Required fields for link creation or update
  const requiredFields = ["group_name", "href", "title"];

  // Check if required fields are provided and not null or empty
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return { status: 400, message: `Invalid input: ${field} are required` };
    }
  }

  // Check if the same link already exists
  const existingAlbum = await knex("links").where({
    group_name: req.body.group_name,
    href: req.body.href,
    title: req.body.title,
  });

  // If updating, allow the same link if it’s the only one or doesn’t exist
  // If creating, don’t allow the same link if it already exists
  if ((update && existingLink) || (!update && existingLink)) {
    return { status: 409, message: "A link with the same details already exists" };
  }
};

module.exports = { validateLinkFields };
