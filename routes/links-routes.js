const router = require("express").Router();
const linksController = require("../controllers/links-controller");
const { authorize } = require("../middleware/authorize");

// Get a single link by ID
router.route("/:id").get(linksController.getLinkById);

// Create a new link
router.route("/").post(authorize, linksController.createLink);

// Update an existing link
router.route("/:id").put(authorize, linksController.updateLink);

// Delete a link
router.route("/:id").delete(authorize, linksController.deleteLink);

module.exports = router;
