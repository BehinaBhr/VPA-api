const knex = require("knex")(require("../knexfile"));

const validateGroupsFields = async (req, update = false) => {
  // Required fields for group creation or update
  const requiredFields = ["name"];

  // Check if required fields are provided and not null or empty
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return { status: 400, message: `Invalid input: ${field} are required` };
    }
  }

  // Check if the same group already exists
  const existingGroup = await knex("groups").where({
    name: req.body.name,
  });

  // If updating, allow the same group if it’s the only one or doesn’t exist
  // If creating, don’t allow the same group if it already exists
  if ((update && existingGroup.length > 1) || (!update && existingGroup.length > 0)) {
    return { status: 409, message: "Same group already exists" };
  }
};

module.exports = { validateGroupsFields };
