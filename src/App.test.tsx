import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders source', () => {
  render(<App />);
  const linkElement = screen.getByText(/source/i);
  expect(linkElement).toBeInTheDocument();
});
