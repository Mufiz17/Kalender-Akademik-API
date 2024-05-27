const express = require('express');
const router = express.Router();

const { createTask, getTasks, updateTask, deleteTask, showId } = require('../controllers/todoController');
const auth = require('../Middleware/authentication');

router.get('/', auth, getTasks);
router.post('/create', auth, createTask);
router.patch('/:id/update', auth, updateTask);
router.delete('/:id/delete', auth, deleteTask);
router.get('/:date/:month/:year/show', auth, showId);

module.exports = router;