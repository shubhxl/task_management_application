import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      if (newTask.title) {
        const response = await axios.post('http://localhost:3001/tasks', newTask);
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', status: 'To Do' });
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskToDelete) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskToDelete._id}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskToDelete._id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${taskId}`, {
        status: newStatus,
      });
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <AppBar position="static" >
        <Toolbar sx={{justifyContent: 'center'}}>
          <Typography variant="h6">Task Management Application</Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        sx={{ marginTop: '2rem' }}
      >
        <TaskForm
          newTask={newTask}
          handleInputChange={handleInputChange}
          handleAddTask={handleAddTask}
        />
        <TaskList
          tasks={tasks}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />
      </Container>
    </div>
  );
};

export default App;
