const Event = require('../models/event');
const User = require('../models/user');

async function handleCreateNewEvent(req, res) {
    try {
        const { title, description, date, location, maxCapacity } = req.body;

        if (!title || !description || !date || !location || !maxCapacity) {
            return res.status(400).json({ error: "All fields are required to create an event" });
        }

        const newEvent = await Event.create({
            title,
            description,
            date: new Date(date),
            location,
            maxCapacity: Number(maxCapacity),
            registeredUsers: [] 
        });

        return res.status(201).json({ message: "Event created successfully!", eventId: newEvent._id });
    } catch (err) {
        console.error("Error creating event:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleGetAllEvents(req, res) {
    try {
        const events = await Event.find({}).sort({ date: 1 });
        return res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleCreateNewEvent,
    handleGetAllEvents,
};