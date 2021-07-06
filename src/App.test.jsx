import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "Welcome to Gud Reads" title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Gud Reads/i);
  expect(linkElement).toBeInTheDocument();
});
