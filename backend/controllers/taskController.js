const Task = require('../models/task');

// CRUD operations for tasks

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndRemove(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Task not found' });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
