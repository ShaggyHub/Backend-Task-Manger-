const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, column } = req.body;

  if (!title || !column) {
    return res.status(400).json({ error: 'Title and column are required' });
  }

  try {
    const task = new Task({
      title,
      description,
      column,
      userId: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Similar for updateTask and deleteTask
