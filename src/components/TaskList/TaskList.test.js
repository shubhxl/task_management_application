import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

const mockTasks = [
  { _id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' },
  { _id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
];

test('renders task list component', () => {
  render(<TaskList tasks={mockTasks} />);
  const taskListElement = screen.getByText('Task 1');
  expect(taskListElement).toBeInTheDocument();
});

test('filters tasks based on status', () => {
  render(<TaskList tasks={mockTasks} />);
  const selectElement = screen.getByTestId('filterTasks');
  fireEvent.change(selectElement, { target: { value: 'To Do' } });
  const filteredTask = screen.getByText('Task 1');
  expect(filteredTask).toBeInTheDocument();
});

test('searches tasks by title', () => {
  render(<TaskList tasks={mockTasks} />);
  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'Task 2' } });
  const searchedTask = screen.getByText('Task 2');
  expect(searchedTask).toBeInTheDocument();
});

test('checks if delete button works', () => {
  const handleDeleteTask = jest.fn();
  render(<TaskList tasks={mockTasks} handleDeleteTask={handleDeleteTask} />);
  const deleteButton = screen.getByTestId('delete0');
  fireEvent.click(deleteButton);
  expect(handleDeleteTask).toHaveBeenCalledTimes(1);
});
