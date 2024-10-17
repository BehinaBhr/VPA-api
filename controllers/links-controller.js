const knex = require("knex")(require("../knexfile"));
const { validateLinksFields } = require("../validators/links-validators");

// Get a single link by ID
const getLinkById = async (req, res) => {
  const { id } = req.params;
  try {
    const link = await knex("links").where({ id }).first();
    if (link) {
      res.status(200).json(link);
    } else {
      res.status(404).json({ message: `Link with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve link with ID ${id}: ${error}` });
  }
};

// Create a new link
const createLink = async (req, res) => {
  const validationResponse = await validateLinksFields(req);
  if (validationResponse) {
    return res.status(validationResponse.status).json({ message: validationResponse.message });
  }

  try {
    const [newLinkId] = await knex("links").insert(req.body);
    const newLink = await knex("links").where({ id: newLinkId }).first();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: `Unable to create a new link: ${error}` });
  }
};

// Update an existing link
const updateLink = async (req, res) => {
  const { id } = req.params;
  const { group_id, href, title } = req.body;

  const validationResponse = await validateLinksFields(req, true);
  if (validationResponse) {
    return res.status(validationResponse.status).json({ message: validationResponse.message });
  }

  try {
    const updated = await knex("links").where({ id }).update({ group_id, href, title });
    if (updated) {
      const updatedLink = await knex("links").where({ id }).first();
      res.status(200).json(updatedLink);
    } else {
      res.status(404).json({ message: `Link with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to update link with ID ${id}: ${error}` });
  }
};

// Delete a link
const deleteLink = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("links").where({ id }).del();
    if (deleted) {
      res.status(200).json({ message: "Link deleted successfully" });
    } else {
      res.status(404).json({ message: `Link with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to delete link with ID ${id}: ${error}` });
  }
};

module.exports = {
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
};
