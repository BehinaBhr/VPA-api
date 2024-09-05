const router = require("express").Router();
const linksController = require("../controllers/links-controller");

// Get a single link by ID
router.route("/:id").get(linksController.getLinkById);

// Create a new link
router.route("/").post(linksController.createLink);

// Update an existing link
router.route("/:id").put(linksController.updateLink);

// Delete a link
router.route("/:id").delete(linksController.deleteLink);

module.exports = router;
