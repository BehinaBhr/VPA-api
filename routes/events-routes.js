const router = require("express").Router();
const eventsController = require("../controllers/events-controller");
const { authorize } = require("../middleware/authorize");

// Get all events sorted by date in decending
router.route("/").get(eventsController.getAllEvents);

// Get past events
router.route("/past").get(eventsController.getPastEvents);

// Get upcoming events
router.route("/upcoming").get(eventsController.getUpcomingEvents);

// Get a single event by ID
router.route("/:id").get(eventsController.getEventById);

// Create a new event
router.route("/").post(authorize, eventsController.createEvent);

// Update an existing event
router.route("/:id").put(authorize, eventsController.updateEvent);

// Delete a event
router.route("/:id").delete(authorize, eventsController.deleteEvent);

module.exports = router;
