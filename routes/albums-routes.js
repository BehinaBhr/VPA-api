const router = require("express").Router();
const albumsController = require("../controllers/albums-controller");
const { authorize } = require("../middleware/authorize");

// Route to get all albums
router.route("/").get(albumsController.getAllAlbums);

// Route to get an album by ID
router.route("/:id").get(albumsController.getAlbumById);

// Route to create a new album
router.route("/").post(authorize, albumsController.createAlbum);

// Route to update an existing album
router.route("/:id").put(authorize, albumsController.updateAlbum);

// Route to delete an album
router.route("/:id").delete(authorize, albumsController.deleteAlbum);

module.exports = router;
