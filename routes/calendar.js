const express = require('express');
const router = express.Router();

const { getCalendar, createEvent, updateEvent, showEvent, deleteEvent } = require('../controllers/calendarController');
const auth = require('../Middleware/authentication');

router.get('/', auth, getCalendar);
router.post('/create', auth, createEvent);
router.patch('/:id/update', auth, updateEvent);
router.get('/:date/:month/:year/show', auth, showEvent);
router.delete('/:id/delete', auth, deleteEvent);

module.exports = router;