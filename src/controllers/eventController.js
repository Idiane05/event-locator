// src/controllers/eventController.js

// Dummy data for events (replace with database logic later)
let events = [];

/**
 * Create a new event
 */
exports.createEvent = (req, res) => {
    const { name, description, latitude, longitude, date, category } = req.body;
    
    if (!name || !description || !latitude || !longitude || !date || !category) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newEvent = {
        id: events.length + 1, // Simple auto-increment ID for now
        name,
        description,
        latitude,
        longitude,
        date,
        category,
    };

    events.push(newEvent);
    return res.status(201).json({ message: 'Event created', event: newEvent });
};

/**
 * Get all events
 */
exports.getEvents = (req, res) => {
    return res.status(200).json({ events });
};

/**
 * Get a specific event by ID
 */
exports.getEventById = (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const event = events.find((e) => e.id === eventId);

    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    return res.status(200).json({ event });
};

/**
 * Update an event by ID
 */
exports.updateEvent = (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const event = events.find((e) => e.id === eventId);

    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    const { name, description, latitude, longitude, date, category } = req.body;

    // Update the event properties
    event.name = name || event.name;
    event.description = description || event.description;
    event.latitude = latitude || event.latitude;
    event.longitude = longitude || event.longitude;
    event.date = date || event.date;
    event.category = category || event.category;

    return res.status(200).json({ message: 'Event updated', event });
};

/**
 * Delete an event by ID
 */
exports.deleteEvent = (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const eventIndex = events.findIndex((e) => e.id === eventId);

    if (eventIndex === -1) {
        return res.status(404).json({ error: 'Event not found' });
    }

    events.splice(eventIndex, 1);
    return res.status(200).json({ message: 'Event deleted' });
};
