import React from 'react';
import { TextField, FormControl, Select, MenuItem, Button, Box } from '@mui/material';

const TaskForm = ({ newTask, handleInputChange, handleAddTask }) => {
  return (
    <Box
      component="form"
      data-testid='form'
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '1.5rem',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TextField
        label="Title"
        name="title"
        data-testid="title"
        value={newTask.title}
        onChange={handleInputChange}
        required
        sx={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Description"
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        multiline
        rows={4}
        sx={{ marginBottom: '1rem' }}
      />
      <FormControl sx={{ marginBottom: '1rem' }}>
        <Select
          value={newTask.status}
          onChange={handleInputChange}
          name="status"
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleAddTask}
        sx={{
          backgroundColor: '#4caf50',
          color: 'white',
          '&:hover': {
            backgroundColor: '#43a047',
          },
        }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
