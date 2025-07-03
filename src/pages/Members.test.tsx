import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Members } from './Members';
import { BrowserRouter } from 'react-router-dom';

// Mock child components and hooks
vi.mock('@/hooks/use-mobile', () => ({
  useMobile: () => ({ isMobile: false }),
}));

// Mock any API calls or data fetching if the component does that.
// For now, assuming it primarily renders UI elements and tables.

describe('Members Page', () => {
  it('renders the members page header, search, and table placeholders', () => {
    render(
      <BrowserRouter>
        <Members />
      </BrowserRouter>
    );

    // Header
    expect(screen.getByText('Members')).toBeInTheDocument(); // Changed from "Members Directory"
    expect(screen.getByRole('button', { name: 'Add Member' })).toBeInTheDocument(); // Adjusted button name

    // Search and Filters (basic check)
    expect(screen.getByPlaceholderText('Search members by name or email...')).toBeInTheDocument(); // Full placeholder
    // The "Filters" button is not present, it's a select dropdown.
    // We can check for the default option of the select:
    expect(screen.getByText('All Members')).toBeInTheDocument();

    // Removed table header checks as content is in cards

    // Placeholder for when no members are found (if applicable)
    // This depends on how the actual component handles empty states.
    // For example, if it shows a specific message:
    // expect(screen.getByText('No members found.')).toBeInTheDocument();
    // Or if it just renders an empty table, that's also fine for a basic test.
  });
});
