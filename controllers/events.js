const { client } = require("../lib/database.config");
const {
  fetchEventsQuery,
  createEventsTableQuery,
  seedEventsTable,
  fetchSingleEventQuery,
  createEventQuery,
  updateEventQuery,
  deleteEventQuery,
} = require("../queries/events");

async function getAllEvents(req, res) {
  try {
    await client.query(createEventsTableQuery);
    const eventsResult = await client.query(fetchEventsQuery);
    if (eventsResult.rows.length > 0) {
      res.send(eventsResult.rows);
    } else {
      await client.query(seedEventsTable);
      const seededEventsResult = await client.query(fetchEventsQuery);
      res.send(seededEventsResult.rows);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal server error");
  }
}

const getSingleEvent = async (req, res) => {
  const query = fetchSingleEventQuery(req.params.id);
  try {
    const result = await client.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error fetching single event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEvent = async (req, res) => {
  const query = createEventQuery(req.body);
  try {
    await client.query(query);
    res.send({ message: "Successfully created event" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEvent = async (req, res) => {
  const query = updateEventQuery(req.params.id, req.body);
  try {
    await client.query(query);
    await res.send({ message: "Successfully updated event" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteEvent = async (req, res) => {
  const query = deleteEventQuery(req.params.id);
  try {
    await client.query(query);
    await res.send({ message: "Successfully deleted event" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};