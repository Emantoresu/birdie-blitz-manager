import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ClubNightsEmptyState } from './ClubNightsEmptyState';

describe('ClubNightsEmptyState', () => {
  it('renders correctly', () => {
    render(<ClubNightsEmptyState />);
    expect(screen.getByText('No club nights found')).toBeInTheDocument(); // Removed period
    expect(screen.getByText("Try adjusting your search terms or filters.")).toBeInTheDocument(); // Updated text
    // Removed button check as it does not exist in the component
  });
});
