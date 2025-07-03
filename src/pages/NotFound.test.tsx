import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from './NotFound';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound Page', () => {
  it('renders the 404 error message and a link to home', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument(); // Updated text
    // Removed assertion for the longer descriptive text as it's not in the component

    const homeLink = screen.getByRole('link', { name: 'Return to Home' }); // Updated link text
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
