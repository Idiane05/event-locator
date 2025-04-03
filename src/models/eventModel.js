const db = require('../config/db'); // Assuming you have a database connection

// Create Event Model
const createEvent = async (name, description, latitude, longitude, date, category) => {
    const query = `
        INSERT INTO events (name, description, location, date, category)
        VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326), $5, $6)
        RETURNING *;
    `;
    const values = [name, description, latitude, longitude, date, category];
    try {
        const { rows } = await db.query(query, values);
        return rows[0]; // Return the newly created event
    } catch (err) {
        throw new Error("Error creating event");
    }
};

// Get all events
const getAllEvents = async () => {
    const query = "SELECT * FROM events;";
    try {
        const { rows } = await db.query(query);
        return rows;
    } catch (err) {
        throw new Error("Error retrieving events");
    }
};

// Get event by ID
const getEventById = async (id) => {
    const query = "SELECT * FROM events WHERE id = $1;";
    try {
        const { rows } = await db.query(query, [id]);
        return rows[0];
    } catch (err) {
        throw new Error("Error retrieving event");
    }
};

// Update Event
const updateEvent = async (id, name, description, latitude, longitude, date, category) => {
    const query = `
        UPDATE events
        SET name = $1, description = $2, location = ST_SetSRID(ST_MakePoint($3, $4), 4326), date = $5, category = $6
        WHERE id = $7
        RETURNING *;
    `;
    const values = [name, description, latitude, longitude, date, category, id];
    try {
        const { rows } = await db.query(query, values);
        return rows[0];
    } catch (err) {
        throw new Error("Error updating event");
    }
};

// Delete Event
const deleteEvent = async (id) => {
    const query = "DELETE FROM events WHERE id = $1 RETURNING *;";
    try {
        const { rows } = await db.query(query, [id]);
        return rows[0];
    } catch (err) {
        throw new Error("Error deleting event");
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
