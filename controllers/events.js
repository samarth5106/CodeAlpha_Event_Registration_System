const Event = require('../models/event');
const User = require('../models/user');

// 1. Create a New Event (Already written)
async function handleCreateNewEvent(req, res) {
    try {
        const { title, description, date, location, maxCapacity } = req.body;
        if (!title || !description || !date || !location || !maxCapacity) {
            return res.status(400).json({ error: "All fields are required to create an event" });
        }
        const newEvent = await Event.create({
            title, description, date: new Date(date), location, maxCapacity: Number(maxCapacity), registeredUsers: []
        });
        return res.status(201).json({ message: "Event created successfully!", eventId: newEvent._id });
    } catch (err) {
        console.error("Error creating event:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// 2. Fetch All Events (Already written)
async function handleGetAllEvents(req, res) {
    try {
        const events = await Event.find({}).sort({ date: 1 });
        return res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// 3. CORE REGISTRATION ENGINE (New Function!)
async function handleRegisterForEvent(req, res) {
    try {
        const { eventId, name, email } = req.body;

        if (!eventId || !name || !email) {
            return res.status(400).json({ error: "Event ID, Name, and Email are all required" });
        }

        // Rule 1: Find the target event
        const targetEvent = await Event.findById(eventId);
        if (!targetEvent) {
            return res.status(404).json({ error: "Target event not found" });
        }

        // Rule 2: Check Seat Capacity
        if (targetEvent.registeredUsers.length >= targetEvent.maxCapacity) {
            return res.status(400).json({ error: "Registration failed. This event is fully booked!" });
        }

        // Rule 3: Upsert User (Find them by email, or create them if they are fresh)
        let user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            user = await User.create({
                name,
                email: email.toLowerCase().trim(),
                myRegistrations: [],
            });
        }

        // Rule 4: Prevent Duplicate Registration
        if (targetEvent.registeredUsers.includes(user._id)) {
            return res.status(400).json({ error: "You have already registered for this event!" });
        }

        // Rule 5: Update BOTH documents to establish the data relationship
        targetEvent.registeredUsers.push(user._id);
        await targetEvent.save();

        user.myRegistrations.push(targetEvent._id);
        await user.save();

        return res.status(200).json({ 
            message: "Success! Your seat has been reserved.", 
            userId: user._id, 
            eventId: targetEvent._id 
        });

    } catch (err) {
        console.error("Error executing user registration:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Remember to add your new function to the exports object at the bottom!
module.exports = {
    handleCreateNewEvent,
    handleGetAllEvents,
    handleRegisterForEvent, // <-- Added here
};