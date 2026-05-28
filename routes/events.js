const express = require('express');
const { handleCreateNewEvent, handleGetAllEvents, handleRegisterForEvent } = require('../controllers/events');

const router = express.Router();

router.post('/', handleCreateNewEvent);
router.get('/', handleGetAllEvents);

router.post('/register', handleRegisterForEvent); 

module.exports = router;