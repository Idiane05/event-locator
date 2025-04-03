// src/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Create an event with name, description, date, location, and category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', createEvent);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events.
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Internal server error
 */
router.get('/', getEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     description: Retrieve details of a specific event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getEventById);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     description: Update an existing event by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Delete an event by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteEvent);

module.exports = router;
