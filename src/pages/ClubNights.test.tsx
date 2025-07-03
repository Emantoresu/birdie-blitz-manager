import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClubNights } from './ClubNights';
import { BrowserRouter } from 'react-router-dom';

// Mock hooks and components
vi.mock('@/hooks/use-mobile', () => ({
  useMobile: () => ({ isMobile: false }),
}));

// Mock API call or data fetching if any
// For now, assuming it renders static content or child components that are already mocked/tested

describe('ClubNights Page', () => {
  it('renders the ClubNightsHeader and ClubNightsFilters', () => {
    render(
      <BrowserRouter>
        <ClubNights />
      </BrowserRouter>
    );
    // Check for Header
    expect(screen.getByText('Club Nights')).toBeInTheDocument();
    // Check for Filters
    expect(screen.getByPlaceholderText('Search club nights by title or organizer...')).toBeInTheDocument();
  });

  // Add more tests here if there's specific logic in ClubNights.tsx
  // For example, if it fetches and displays a list of club nights.
});
