const knex = require("knex")(require("../knexfile"));
const { FormatSrc } = require("../utils/utils");
const { validateAlbumsFields } = require("../validators/albums-validators");

// Get all albums sorted by `date`
const getAllAlbums = async (req, res) => {
  try {
    const albums = await knex("albums").select("*").orderBy("date", "desc");
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
  const validationResponse = await validateAlbumsFields(req);
  if (validationResponse) {
    return res.status(validationResponse.status).json({ message: validationResponse.message });
  }

  const newAlbumData = {
    ...req.body,
    src: FormatSrc(req.body.src), // Format the src URL
  };

  try {
    // to get a response with the full details of created album
    const [newAlbumId] = await knex("albums").insert({ newAlbumData });
    const newAlbum = await knex("albums").where({ id: newAlbumId }).first();
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ message: `Unable to create a new album": ${error}` });
  }
};

// Update an existing album
const updateAlbum = async (req, res) => {
  const { id } = req.params;

  const validationResponse = await validateAlbumsFields(req, true);
  if (validationResponse) {
    return res.status(validationResponse.status).json({ message: validationResponse.message });
  }

  const updates = {
    ...req.body,
    src: FormatSrc(req.body.src), // Format the src URL
  };

  // to get a response with the full details of updated album
  try {
    const updatedRow = await knex("albums").where({ id }).update(updates);

    if (updatedRow) {
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
