const { successResponse, internalErrorResponse, errorResponse } = require('../config/responseJson');
const { calendar, users } = require('../models');

const getTasks = async(req, res) => {
    try {
        const task = await calendar.findAll({
            where: {
                userId: req.user.id
            },
            attributes: ['id', 'dd_mm_yyyy', 'category', 'description']
                // include: [{
                //     model: users,
                //     as: 'user',
                //     attributes: ['id', 'name', 'email']
                // }]
        });

        successResponse(res, 'Date fetched successfully', task, 200)
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
}

const createTask = async(req, res) => {
    const userId = req.user.id;
    const { dd_mm_yyyy, date, month, year, category, description } = req.body;

    try {
        const task = await calendar.create({
            dd_mm_yyyy,
            date,
            month,
            year,
            category,
            description,
            userId
        });

        if (!task) {
            errorResponse(res, 'Event not created', 400);
        } else {
            successResponse(res, 'Event added successfully', task, 201);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
}

const updateTask = async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { category, description } = req.body;

    try {
        const task = await calendar.findOne({
            where: {
                id,
                userId
            }
        });

        if (!task) {
            errorResponse(res, 'Date not found', 404);
        }
        const updatedTask = await calendar.update({
            category,
            description
        }, {
            where: {
                id,
                userId
            }
        });

        const taskReponse = {
            id: task.id,
            category: task.category,
            description: task.description
        }

        if (!updatedTask) {
            errorResponse(res, 'Event not updated', 400);
        } else {
            successResponse(res, 'Event updated successfully', taskReponse, 200);
        }
    } catch (err) {
        console.error(err);
        internalErrorResponse(res, err, 500);
    }
}

const showId = async(req, res) => {
    const { date, month, year } = req.params; // Destructure params for clarity
    const userId = req.user.id;

    try {
        const task = await calendar.findOne({
            where: {
                year: parseInt(year), // Ensure year is a number for comparison
                month: parseInt(month), // Ensure month is a number for comparison
                date,
                userId
            },
            attributes: ['id', 'dd_mm_yyyy', 'category', 'description']
        });

        if (!task) {
            errorResponse(res, 'Date not found', 404);
        } else {
            successResponse(res, 'Date fetched successfully', task, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};


const deleteTask = async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const task = await calendar.findOne({
            where: {
                id,
                userId
            }
        });
        if (!task) {
            errorResponse(res, 'Date not found', 404);
        }

        const deletedTask = await calendar.destroy({
            where: {
                id,
                userId
            }
        });

        if (!deletedTask) {
            errorResponse(res, 'Event not deleted', 400);
        } else {
            successResponse(res, 'Event deleted successfully', calendar, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500)
    }
}
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    showId
}