const knex = require("knex")(require("../knexfile"));
const { validateGroupsFields } = require("../validators/groups-validators");

// Get all groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await knex("groups").select("*");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve groups grouped by group_name: ${error}` });
  }
};

// Get a single group by ID
const getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await knex("groups").where({ id }).first();
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ message: `group with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve group with ID ${id}: ${error}` });
  }
};

// Get a group of links by group_id
const getGroupedLinkByGroupId = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the group ID exists
    const group = await knex("groups").where({ id }).first();
    if (!group) {
      return res.status(404).json({ message: `Group with ID: ${id} not found` });
    }
    // If the group exists, fetch the associated links
    const groupedLink = await knex("links").where({ group_id: id }).select("id", "href", "title");
    if (groupedLink) {
      res.status(200).json(groupedLink);
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve links for group with ID: ${id}: ${error}` });
  }
};

// Create a new group
const createGroup = async (req, res) => {
  const validationResponse = await validateGroupsFields(req);
  if (validationResponse) {
    return res.status(validationResponse.status).json({ message: validationResponse.message });
  }

  try {
    const [newGroupId] = await knex("groups").insert(req.body);
    const newGroup = await knex("groups").where({ id: newGroupId }).first();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: `Unable to create a new group: ${error}` });
  }
};

// Update an existing group
const updateGroup = async (req, res) => {
  const { id } = req.params;

  const validationResponse = await validateGroupsFields(req, true);
  if (validationResponse) {
    return res.status(validationResponse.status).json({ message: validationResponse.message });
  }

  try {
    const updated = await knex("Groups").where({ id }).update(req.body);
    if (updated) {
      const updatedGroup = await knex("groups").where({ id }).first();
      res.status(200).json(updatedGroup);
    } else {
      res.status(404).json({ message: `Group with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to update group with ID ${id}: ${error}` });
  }
};

// Delete a group
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("groups").where({ id }).del();
    if (deleted) {
      res.status(200).json({ message: "Group deleted successfully" });
    } else {
      res.status(404).json({ message: `Group with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to delete group with ID ${id}: ${error}` });
  }
};

module.exports = {
  getAllGroups,
  getGroupById,
  getGroupedLinkByGroupId,
  createGroup,
  updateGroup,
  deleteGroup,
};
