const express = require('express');
const { handleCreateNewEvent, handleGetAllEvents } = require('../controllers/events');

const router = express.Router();

router.post('/', handleCreateNewEvent);

router.get('/', handleGetAllEvents);

module.exports = router;