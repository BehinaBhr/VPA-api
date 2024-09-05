const knex = require("knex")(require("../knexfile"));
const { ValidateHref } = require("../utils/utils");

const validateLinksFields = async (req, update = false) => {
  // Required fields for link creation or update
  const requiredFields = ["group_id", "href", "title"];

  // Check if required fields are provided and not null or empty
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return { status: 400, message: `Invalid input: ${field} are required` };
    }
  }

  // Validate the 'href' field
  if (!ValidateHref(req.body.href)) {
    return { status: 400, message: "Invalid input: href must be a valid URL" };
  }

  // Check if the same link already exists
  const existingLink = await knex("links").where({ href: req.body.href, title: req.body.title });

  // If updating, allow the same link if it’s the only one or doesn’t exist
  // If creating, don’t allow the same link if it already exists
  if ((update && existingLink.length > 1) || (!update && existingLink.length > 0)) {
    return { status: 409, message: "Same link already exists" };
  }
};

module.exports = { validateLinksFields };
