const router = require("express").Router();
const groupsController = require("../controllers/groups-controller");
const {authorize} = require("../ middleware/authorize")

// Get all groups grouped by group_name
router.route("/").get(groupsController.getAllGroups);

// Get a single group by ID
router.route("/:id").get(groupsController.getGroupById);

// Get grouped links by group ID
router.route("/:id/links").get(groupsController.getGroupedLinkByGroupId);

// Create a new group
router.route("/").post(authorize, groupsController.createGroup);

// Update an existing group
router.route("/:id").put(authorize, groupsController.updateGroup);

// Delete a group
router.route("/:id").delete(authorize, groupsController.deleteGroup);

module.exports = router;
