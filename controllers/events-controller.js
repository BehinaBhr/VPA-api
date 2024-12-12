const knex = require("knex")(require("../knexfile"));
const { validateEventsFields } = require("../validators/events-validators");
const { FormatImg } = require("../utils/utils");

// Fields to select for events
const eventAttr = [
  "events.id",
  "events.image",
  "events.title",
  "events.date",
  "events.time",
  "events.location",
  "events.topic",
  "events.host",
  "events.additional_info",
  "events.fee",
  "events.register",
  knex.raw(`CASE WHEN events.date >= CURDATE() THEN TRUE ELSE FALSE END AS isUpcoming`)
];

// Get all events sorted by date in decending order
const getAllEvents = async (req, res) => {
  try {
    const events = await knex("events").select(eventAttr).orderBy("date", "desc");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve events sorted by date in decending order: ${error}` });
  }
};

// Get past events
const getPastEvents = async (req, res) => {
  try {
    const pastEvents = await knex("events").whereRaw("date < CURDATE()").orderBy("date", "desc").select(eventAttr);
    res.status(200).json(pastEvents);
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve past events: ${error}` });
  }
};

// Get upcoming events
const getUpcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await knex("events").whereRaw("date >= CURDATE()").orderBy("date", "desc").select(eventAttr);
    res.status(200).json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve upcoming events: ${error}` });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await knex("events").select(eventAttr).where({ id }).first();
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: `Event with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to retrieve event with ID ${id}: ${error}` });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  const validationResponse = await validateEventsFields(req);
  if (validationResponse) {
    return res.status(validationResponse.status).json({ message: validationResponse.message });
  }

  const newEventData  = {
    ...req.body,
    image: FormatImg(req.body.image), // Format the image URL
  };

  try {
    // to get a response with the full details of created event
    const [newEventId] = await knex("events").insert(newEventData);
    const newEvent = await knex("events").select(eventAttr).where({ id: newEventId }).first();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: `Unable to create a new event: ${error}` });
  }
};

// Update an existing event
const updateEvent = async (req, res) => {
  const { id } = req.params;

  const validationResponse = await validateEventsFields(req, true);
  if (validationResponse) {
    return res.status(validationResponse.status).json({ message: validationResponse.message });
  }

  const updates = {
    ...req.body,
    image: FormatImg(req.body.image), // Format the image URL
  };

  // to get a response with the full details of updated event
  try {
    const updatedRow = await knex("events").where({ id }).update(updates);

    if (updatedRow) {
      const updatedEvent = await knex("events").select(eventAttr).where({ id }).first();
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: `Event with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to update event with ID ${id}: ${error}` });
  }
};

// Delete a event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("events").where({ id }).del();
    if (deleted) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: `Event with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to delete event with ID ${id}: ${error}` });
  }
};

module.exports = {
  getAllEvents,
  getPastEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
