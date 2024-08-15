const router = require("express").Router();
const albumsController = require("../controllers/albums-controller");

// Route to get all albums
router.get("/", albumsController.getAllAlbums);

// Route to get an album by ID
router.get("/:id", albumsController.getAlbumById);

// Route to create a new album
router.post("/", albumsController.createAlbum);

// Route to update an existing album
router.put("/:id", albumsController.updateAlbum);

// Route to delete an album
router.delete("/:id", albumsController.deleteAlbum);

module.exports = router;
