const router = require("express").Router();
const eventsController = require("../controllers/events-controller");

// Get all events sorted by date in decending
router.route("/").get(eventsController.getAllEvents);

// Get past events
router.get("/past", eventsController.getPastEvents);

// Get ongoing events
router.get("/ongoing", eventsController.getOngoingEvents);

// Get a single event by ID
router.route("/:id").get(eventsController.getEventById);

// Create a new event
router.route("/").post(eventsController.createEvent);

// Update an existing event
router.route("/:id").put(eventsController.updateEvent);

// Delete a event
router.route("/:id").delete(eventsController.deleteEvent);

module.exports = router;