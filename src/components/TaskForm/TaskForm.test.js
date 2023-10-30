import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

test('renders task form component', () => {
  render(<TaskForm newTask={{ title: '', description: '', status: '' }} />);
  const formElement = screen.getByTestId('form');
  expect(formElement).toBeInTheDocument();
});

test('renders form fields for title, description, and status', () => {
  render(<TaskForm newTask={{ title: '', description: '', status: '' }} />);
  const titleInput = screen.getByTestId('title');
  const descriptionInput = screen.getByLabelText('Description');
  const statusSelect = screen.getByRole('combobox');
  expect(titleInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(statusSelect).toBeInTheDocument();
});

test('form submission with valid input', () => {
  const handleInputChange = jest.fn();
  const handleAddTask = jest.fn();
  render(
    <TaskForm
      newTask={{ title: 'New Task', description: 'New Task Description', status: 'To Do' }}
      handleInputChange={handleInputChange}
      handleAddTask={handleAddTask}
    />
  );
  const addButton = screen.getByRole('button', { name: 'Add Task' });

  fireEvent.click(addButton);

  expect(handleAddTask).toHaveBeenCalledTimes(1);
});
