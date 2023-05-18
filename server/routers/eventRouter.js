import express from 'express';
import { getEventById, createEvent, getAllEvents, updateEvent, deleteEvent } from '../queries/eventQueries.js';

const router = express.Router();

router.get('/events', async (req, res) => {
    try {
        const events = await getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
});

router.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await getEventById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error });
    }
});

router.post('/createEvent', async (req, res) => {
    try {
        const {
            name,
            date,
            time,
            description,
            location,
            image,
            ticket_max,
            ticket_left,
            price,
        } = req.body;

        const newEvent = {
            name,
            date,
            time,
            description,
            location,
            image,
            ticket_max,
            ticket_left,
            price,
        };

        const eventId = await createEvent(newEvent);
        res.json({ message: 'Event created', eventId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
});


router.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const modifiedCount = await updateEvent(id, updatedData);
        if (modifiedCount === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCount = await deleteEvent(id);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
});

export default router;
