import React, { useState } from 'react';
import { Card, CardContent, CardActions, Grid, Typography, Button, Box, MenuItem, Select, TextField } from '@mui/material';

const TaskList = ({ tasks, handleDeleteTask, handleUpdateTask }) => {
  const [filter, setFilter] = useState('All');
  const [searchTitle, setSearchTitle] = useState('');

  const filteredTasks =
    filter === 'All'
      ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
      )
      : tasks.filter(
        (task) =>
          task.status === filter &&
          task.title.toLowerCase().includes(searchTitle.toLowerCase())
      );

  return (
    <div>
      {
        tasks.length > 0 &&

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '400px',
            margin: '2rem auto',
            padding: '1.5rem',
            borderRadius: '10px',
            backgroundColor: '#e4f8f4',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                inputProps={{"data-testid":"filterTasks"}}
                sx={{
                  borderRadius: '5px',
                  height: '2rem',
                  maxWidth: '150px'
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
              <TextField
                label="Search by Title"
                variant="outlined"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                sx={{ 
                  width: 200, 
                  height:30, 
                  marginLeft: '1rem', 
                  label:{
                    margin: '-10px 0 0 0'
                  }, 
                  input: {
                    height: '0.1rem' 
                  } }}
              />
          </Grid>



          {filteredTasks.map((task, index) => (
            <Card sx={{ minWidth: 275, backgroundColor: '#ffffff', borderRadius: '7px' }} key={index}>
              <CardContent>
                <Typography sx={{ fontSize: '16px', fontWeight: '700' }} variant='body2'>
                  {task.title}
                </Typography>
                <Typography mt={1} color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body2">
                  {task.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" color="navy">
                  Status:
                  <Select
                    value={task.status}
                    onChange={(e) => handleUpdateTask(task._id, e.target.value)}
                    sx={{ marginLeft: '0.5rem', minWidth: 100, backgroundColor: 'lightblue', height: '1.5rem' }}
                  >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </Typography>
                <Box sx={{ marginTop: 'auto' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    data-testid={`delete${index}`}
                    onClick={() => handleDeleteTask(task)}
                    sx={{ textTransform: 'none', color: '#eb4d4b' }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      }
    </div>
  );

};

export default TaskList;
