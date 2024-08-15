const knex = require("knex")(require("../knexfile"));
const { GroupedLinks } = require("../utils/utils");

// Get all links grouped by group_name
const getAllLinks = async (req, res) => {
  try {
    const links = await knex("links").select("*");
    const groupedLinks = GroupedLinks(links);
    res.status(200).json(groupedLinks);
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve links grouped by group_name: ${error}` });
  }
};

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
  const { group_name, href, title } = req.body;
  try {
    const [id] = await knex("links").insert({ group_name, href, title });
    const newLink = await knex("links").where({ id }).first();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: `Unable to create a new link: ${error}` });
  }
};

/// Update an existing link
const updateLink = async (req, res) => {
  const { id } = req.params;
  const { group_name, href, title } = req.body;
  try {
    const updated = await knex("links").where({ id }).update({ group_name, href, title });
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
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
};
