const knex = require("knex")(require("../knexfile"));
const { FormatSrc } = require("../utils/utils");

const validateAlbumsFields = async (req, update = false) => {

  // Required fields for album creation or update
  const requiredFields = ["name", "date", "src"];

  // Check if required fields are provided and not null or empty
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return { status: 400, message: `Invalid input: ${field} are required` };
    }
  }

  // Validate the 'src' field
  const formattedSrc = FormatSrc(req.body.src);
  if (!formattedSrc) {
    return { status: 400, message: "Invalid input: src must be a valid Google Drive folder link shared with anyone" };
  }

  // Check if the same album already exists
  const existingAlbum = await knex("albums").where({
    ...req.body,
    src: FormatSrc(req.body.src)
  });

  // If updating, allow the same album if it's the only one or doesn't exist
  // If creating, don't allow the same album if it already exists
  if ((update && existingAlbum.length > 1) || (!update && existingAlbum.length > 0)) {
    return { status: 409, message: "Same album already exists" };
  }
};

module.exports = { validateAlbumsFields };
