import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClubNightsFilters } from './ClubNightsFilters';

// Mock the useMobile hook
vi.mock('@/hooks/use-mobile', () => ({
  useMobile: () => ({ isMobile: false }),
}));

describe('ClubNightsFilters', () => {
  it('renders correctly on desktop', () => {
    const mockOnSearchChange = vi.fn();
    const mockOnFilterChange = vi.fn();
    render(
      <ClubNightsFilters
        searchTerm=""
        filterStatus="All"
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );
    expect(screen.getByPlaceholderText('Search club nights by title or organizer...')).toBeInTheDocument();
    expect(screen.getByText('All Status')).toBeInTheDocument(); // Check if the default filter is visible
  });
});
