const express = require('express');
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/TaskController');
const { protect } = require('../middleware/auth');
const { validateTaskCreate, validateTaskUpdate } = require('../middleware/Validate');

// All task routes require authentication
router.use(protect);

// POST   /api/tasks       - Create task
// GET    /api/tasks       - Get all tasks
router.route('/').post(validateTaskCreate, createTask).get(getAllTasks);

// GET    /api/tasks/:id   - Get single task
// PATCH  /api/tasks/:id   - Update task
// DELETE /api/tasks/:id   - Delete task
router
  .route('/:id')
  .get(getTaskById)
  .patch(validateTaskUpdate, updateTask)
  .delete(deleteTask);

module.exports = router;