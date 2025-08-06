import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe game and allows a move', () => {
  render(<App />);
  // It should initially state player X's turn.
  const status = screen.getByText(/Turn: X/i);
  expect(status).toBeInTheDocument();

  // Click the first cell: should place "X" and update the turn to "O"
  const firstCell = screen.getByLabelText(/cell 1-1/i);
  fireEvent.click(firstCell);

  // "X" should appear and now turn should state "O"
  expect(firstCell).toHaveTextContent("X");
  const newStatus = screen.getByText(/Turn: O/i);
  expect(newStatus).toBeInTheDocument();
});

// Additional test: check that restart resets the board
test('restart button resets the game', () => {
  render(<App />);
  const firstCell = screen.getByLabelText(/cell 1-1/i);
  fireEvent.click(firstCell);
  expect(firstCell).toHaveTextContent("X");
  // Click restart
  const restartBtn = screen.getByText(/Restart Game/i);
  fireEvent.click(restartBtn);
  // The cell should be empty
  expect(firstCell).toHaveTextContent("");
});
