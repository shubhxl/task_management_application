const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController'); 


// Validation middleware
const validateTask = (req, res, next) => {
  const { title, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: 'Title and status are required fields' });
  }
  // You can add more specific validation logic here if needed
  next();
};


// routes
router.get('/', getAllTasks);
router.post('/', validateTask, createTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
