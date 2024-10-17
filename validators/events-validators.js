const knex = require("knex")(require("../knexfile"));
const { FormatImg} = require("../utils/utils");

const validateEventsFields = async (req, update = false) => {
  // Required fields for event creation or update
  const requiredFields = ["image", "title", "date", "time", "location"];

  // Check if required fields are provided and not null or empty
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return { status: 400, message: `Invalid input: ${field} are required` };
    }
  }

  // Validate the image field
  const formattedImg= FormatImg(req.body.image);
  if (!formattedImg) {
    return { status: 400, message: "Invalid input: image must be a valid Google Drive file link shared with anyone" };
  }

  // Check if the same event already exists
  const existingEvent = await knex("events").where({
    title: req.body.title,
    date: req.body.date,
  });

  // If updating, allow the same event if it's the only one or doesn't exist
  // If creating, don't allow the same event if it already exists
  if ((update && existingEvent.length > 1) || (!update && existingEvent.length > 0)) {
    return { status: 409, message: "Same event already exists" };
  }
};

module.exports = { validateEventsFields };
