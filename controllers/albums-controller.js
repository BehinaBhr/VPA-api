const knex = require("knex")(require("../knexfile"));
const { FormatSrc } = require("../utils/utils");

// Get all albums
const getAllAlbums = async (req, res) => {
  try {
    const albums = await knex("albums").select("*");
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve albums", error });
  }
};

// Get a single album by ID
const getAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await knex("albums").where({ id }).first();
    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ message: `Album with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve album with ID ${id}: ${error}` });
  }
};

// Create a new album
const createAlbum = async (req, res) => {
  const { name, date, src } = req.body;
  const formattedSrc = FormatSrc(src);

  try {
    const [newAlbumId] = await knex("albums").insert({
      name,
      date,
      src: formattedSrc,
    });
    const newAlbum = await knex("albums").where({ id: newAlbumId }).first();
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ message: `Unable to create a new album": ${error}` });
  }
};

// Update an existing album
const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, date, src } = req.body;
  const formattedSrc = FormatSrc(src);

  try {
    const updatedRows = await knex("albums").where({ id }).update({ name, date, src: formattedSrc });

    if (updatedRows) {
      const updatedAlbum = await knex("albums").where({ id }).first();
      res.status(200).json(updatedAlbum);
    } else {
      res.status(404).json({ message: `Album with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to update album with ID ${id}: ${error}` });
  }
};

// Delete an album
const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await knex("albums").where({ id }).del();

    if (deletedRows) {
      res.status(200).json({ message: "Album deleted successfully" });
    } else {
      res.status(404).json({ message: `Album with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to delete with ID ${id}: ${error}` });
  }
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
